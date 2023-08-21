import React, { useState, useEffect, useCallback } from 'react';
import { request } from 'umi'
import { PageContainer } from '@ant-design/pro-components';
import { imageItem } from '@/utils/interfaces'
import { Spin, Select, Pagination  } from 'antd';
import type { SelectProps } from 'antd';
import { QueryManualList } from '@/services/apis'
import ImgCard from './comp/ImgCard'
import "./index.less";

const ImgList: React.FC = () => {
  const [imgList, setImgList] = useState<Array<imageItem>>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const [current, setCurrent] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [count, SetCount] = useState<number>(0)
  const [statusParams, setStatusParams] = useState<string[]>(['1', '2', '3'])
  const initImgList = async () => {
    setLoading(true)
    try {
      const result = await QueryManualList({page_number: current, page_size: pageSize, manual_sign: statusParams});
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
  }, [current, pageSize, statusParams])

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

  const paginationChangeHandler = (page, pageSize) => {
    setCurrent(page)
    setPageSize(pageSize)
  }

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
          <Pagination
            className='pagination-warpper'
            total={count}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            pageSize={pageSize}
            current={current}
            showSizeChanger
            onChange={paginationChangeHandler}
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
    </PageContainer>
  );
};

export default ImgList;
