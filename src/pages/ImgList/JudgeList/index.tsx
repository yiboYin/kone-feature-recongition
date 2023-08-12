import React, { useState, useEffect, useCallback } from 'react';
import { request } from 'umi'
import { PageContainer } from '@ant-design/pro-components';
import { imageItem } from '@/utils/interfaces'
import { Spin, FloatButton, message } from 'antd';
import { QueryList, DeleteFile, triggerJudgment } from '@/services/apis'
import ImgCard from './comp/ImgCard'
import ConfirmModal from '@/components/ConfirmModal';
import { LeftOutlined, RightOutlined, ReloadOutlined } from '@ant-design/icons'
import "./index.less";

const ImgList: React.FC = () => {
  const [imgList, setImgList] = useState<Array<imageItem>>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const [current, setCurrent] = useState<number>(1)
  const [count, setCount] = useState<number>(0)
  const [editImg, setEditImg] = useState<imageItem>();
  const initImgList = async () => {
    setLoading(true)
    try {
      const result = await QueryList({page_number: current, page_size: 10, img_type: '1'});
      console.log('调试 ---- ', result);
      console.log('result', result.data)
      setImgList(result?.data);
      setCount(result?.count || 0);
      console.log(current, (count % 10), current < (count % 10))
      setLoading(false)
    } catch (e) {
      console.log('e !!!! --- ', e )
      setLoading(false)
    }
  }

  useEffect(() => {
    initImgList()
  }, [current])

  const MODAL_TITLE = '确认删除'
  const MODAL_CONTENT = '确认要删除此文件？'



  const [showModal, setShowModal] = useState<boolean>(false)

  const deleteConfirm = () => {
    setShowModal(true)
  }


  const deleteHandler = async () => {
    console.log(editImg);
    const { img_path, img_type } = editImg;
    const fileName = img_path.split('/').pop();
    const {success} = await DeleteFile({ids: [fileName], img_type: '1' });
    if (success) {
      message.success('删除成功！')
      initImgList()
    } else {
      message.error('删除失败！')
    }

    // TODO 删除数据
    setShowModal(false)
  }

  const cancelDelete = () => {
    // TODO 删除数据
    setShowModal(false)
  }
  const triggerHandler = async () => {
    const { success = false } = await triggerJudgment()
    if (success) {
      message.success('打分成功！')
    } else {
      message.error('打分失败！')
    }
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
              setEditImg={setEditImg}
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
        <FloatButton icon={<LeftOutlined />} onClick={() => {current > 0 && setCurrent(current - 1)}} />
        <FloatButton icon={<RightOutlined />} onClick={() => {current < (1+Math.floor(count/10)) && setCurrent(current + 1)}} />
        <FloatButton icon={<ReloadOutlined />} onClick={() => triggerHandler()} />
    </FloatButton.Group>
    </PageContainer>
  );
};

export default ImgList;
