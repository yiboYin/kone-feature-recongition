import React, { useState, useEffect } from 'react';
import { ImgCardProps } from '@/utils/interfaces'
import { Card, Image, message, Tooltip } from 'antd';
import './ImgCard.less'
import { WEB_SERVE } from '@/utils/constants';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { ManualSign } from '@/services/apis';

const ImgCard = ({ imgItem, initImgList }: ImgCardProps) => {
  const { img_path, manual_sign, id } = imgItem

  let btns = [];
  const setConfirmBtn = () => {
    const clickHandler = async () => {
      const {success} = await ManualSign({ids: [id], manual_sign: '2' });
      if (success) {
        message.success('标注成功！')
        initImgList()
      } else {
        message.error('标注失败！')
      }
    }
    return (
      <Tooltip title="标注通过">
        <CheckOutlined key='confirm' onClick={clickHandler} style={{color: 'green'}} />
      </Tooltip>
    )
  }

  const setRejectBtn = () => {
    const clickHandler = async () => {
      const {success} = await ManualSign({ids: [id], manual_sign: '3' });
      if (success) {
        message.success('标注成功！')
        initImgList()
      } else {
        message.error('标注失败！')
      }
    }
    return (
      <Tooltip title="标注不通过">
        <CloseOutlined key='reject' onClick={clickHandler} style={{color: 'red'}} />
      </Tooltip>
    )
  }
  if (manual_sign === '1') {
    btns.push(setConfirmBtn())
    btns.push(setRejectBtn())
  }
  const [scoreColor, setScoreColor] = useState('');
  useEffect(() => {
    let color = '';
    if (manual_sign === '2') {
      color = 'green'
    } else if (manual_sign === '3') {
      color = 'red'
    } else if (manual_sign === '1') {
      color = 'orange'
    }
    setScoreColor(color)
  }, [manual_sign])
  const ARTIF_STATUS_ENUMS = {
    '1': '未标注',
    '2': '标注通过',
    '3': '标注不通过'
  }

  return (
    <Card
      className={`img-card-warpper${scoreColor ? (' card-border border-color-' + scoreColor) : ''}`}
      style={{ width: '9.25%' }}
      bodyStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      actions={btns}
    >
      <Image src={`${WEB_SERVE}/${img_path}`} />
      <div className="card-info">
        {
          manual_sign !== '' &&
          <div className="score-wrapper">
            <label>人工标注结果: </label>
            <span className={`img-card-warpper ${scoreColor ? ('text-color-' + scoreColor) : ''}`}>{`${ARTIF_STATUS_ENUMS[manual_sign]}`}</span>
          </div>
        }
      </div>
    </Card>
  )
}

export default ImgCard;
