import React from 'react';
import { ImgCardProps } from '@/utils/interfaces'
import { Card, Image } from 'antd';
import './ImgCard.less'
import { DeleteOutlined } from '@ant-design/icons'
import { WEB_SERVE } from '@/utils/constants';


const { Meta } = Card;

const ImgCard = ({ imgItem, deleteHandler, setEditImg }: ImgCardProps) => {
  const { img_path } = imgItem
  const delBtnHandler = () => {
    setEditImg(imgItem)
    deleteHandler(null)
  }

  return (
    <Card
      className="img-card-warpper"
      style={{ width: '18.5%' }}
      bodyStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      actions={[
        <DeleteOutlined key="del" onClick={delBtnHandler} />,
      ]}
    >
      <Image src={`${WEB_SERVE}/${img_path}`} />
    </Card>
  )
}

export default ImgCard;
