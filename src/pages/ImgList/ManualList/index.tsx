import React, { useState, useEffect, useCallback } from 'react';
import { request } from 'umi'
import { PageContainer } from '@ant-design/pro-components';
import { imageItem } from '@/utils/interfaces'
import { Spin, FloatButton, Select } from 'antd';
import type { SelectProps } from 'antd';
import { QueryManualList } from '@/services/apis'
import ImgCard from './comp/ImgCard'
import ConfirmModal from '@/components/ConfirmModal';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import "./index.less";

const ImgList: React.FC = () => {
  const [imgList, setImgList] = useState<Array<imageItem>>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const [current, setCurrent] = useState<number>(1)
  const [count, SetCount] = useState<number>(0)
  const [statusParams, setStatusParams] = useState<string[]>(['1', '2', '3'])
  const initImgList = async () => {
    setLoading(true)
    try {
      const result = await QueryManualList({page_number: current, page_size: 25, manual_sign: statusParams});
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
  }, [current, statusParams])

  const options: SelectProps['options'] = [
    {label: '未标注', value: '1'},
    {label: '标注通过', value: '2'},
    {label: '标注不通过', value: '3'}
  ];

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`, value);
    setStatusParams(value);
    setCurrent(1);
  };

  return (
    <PageContainer>
      {
        loading &&
        <Spin tip="Loading..." size="large" className='page-loading' />
      }
      <div className='manual-list-wrapper'>
        <div className='filter-wrapper'>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '25%' }}
            placeholder="Please select"
            defaultValue={['1', '2', '3']}
            onChange={handleChange}
            options={options}
          />
        </div>
        <div className='img-list-wrapper'>
          {
            imgList.length > 0 && imgList.map(ele =>
              <ImgCard
                key={ele.id}
                imgItem={ele}
                initImgList={initImgList}
              />
            )
          }
        </div>
      </div>
      <FloatButton.Group shape="square" style={{ right: 94 }}>
        <FloatButton icon={<LeftOutlined />} onClick={() => {current > 1 && setCurrent(current - 1)}} />
        <FloatButton icon={<RightOutlined />} onClick={() => {current < (1+Math.floor(count/10)) && setCurrent(current + 1)}} />
      </FloatButton.Group>
    </PageContainer>
  );
};

export default ImgList;
