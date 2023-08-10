import React, { useState, useEffect, useCallback } from 'react';
import { request } from 'umi'
import { PageContainer } from '@ant-design/pro-components';
import { imageItem } from '@/utils/interfaces'
import { Spin, FloatButton } from 'antd';
import { QueryList } from '@/services/apis'
import ImgCard from './comp/ImgCard'
import ConfirmModal from '@/components/ConfirmModal';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import "./index.less";

const ImgList: React.FC = () => {
  const [imgList, setImgList] = useState<Array<imageItem>>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const [current, setCurrent] = useState<number>(0)
  const [count, SetCount] = useState<number>(0)
  const initImgList = async () => {
    setLoading(true)
    try {
      const result = await QueryList({page_number: current, page_size: 10, img_type: '1'});
      console.log('调试 ---- ', result);
      console.log('result', result.data)
      setImgList(result?.data);
      SetCount(result?.count || 0);
      setLoading(false)
    } catch (e) {
      console.log('e !!!! --- ', e )
      setLoading(false)
    }
  }

  useEffect(() => {
    initImgList()
  }, [])

  useEffect(() => {
    initImgList()
  }, [current])

  const MODAL_TITLE = '确认删除'
  const MODAL_CONTENT = '确认要删除此文件？'



  const [showModal, setShowModal] = useState<boolean>(false)

  const deleteConfirm = () => {
    setShowModal(true)
  }


  const deleteHandler = () => {
    // TODO 删除数据
    setShowModal(false)
  }

  const cancelDelete = () => {
    // TODO 删除数据
    setShowModal(false)
  }

  return (
    <PageContainer>
      {
        loading &&
        <Spin tip="Loading..." size="large" className='page-loading' />
      }
      <div className='img-list-wrapper'>
        {
          imgList.length > 0 && imgList.map(ele =>
            <ImgCard
              key={ele.id}
              imgItem={ele}
              deleteHandler={deleteConfirm}
            />
          )
        }
      </div>
      <ConfirmModal
        title={MODAL_TITLE}
        content={MODAL_CONTENT}
        showModal={showModal}
        handleOk={deleteHandler}
        handleCancel={cancelDelete}
      />
      <FloatButton.Group shape="square" style={{ right: 94 }}>
        <FloatButton icon={<LeftOutlined />} onClick={() => {current < (count % 10) && setCurrent(current + 1)}} />
        <FloatButton icon={<RightOutlined />} onClick={() => {current > 0 && setCurrent(current - 1)}} />
    </FloatButton.Group>
    </PageContainer>
  );
};

export default ImgList;
