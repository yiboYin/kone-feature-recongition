import React from 'react';
import { ImgCardProps } from '@/utils/interfaces'
import { Card, Image } from 'antd';
import './ImgCard.less'
import { HighlightOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { WEB_SERVE } from '@/utils/constants';

const setJudgeBtn = () => {
  const clickHandler = () => {
    console.log('say hello1')
  }
  return <HighlightOutlined key='judge' onClick={clickHandler} />
}

const setArtifBtn = () => {
  const clickHandler = () => {
    console.log('say hello2')
  }
  return <ExclamationCircleOutlined key='artif' onClick={clickHandler} />
}

const ImgCard = ({ imgItem }: ImgCardProps) => {
  const { img_path, artificial_judge_sign, judge_score, judge_sign } = imgItem
  // const deleteHandler = () => {}

  let btns = [];
  if (judge_score && parseFloat(judge_score) >= 0.5 && judge_sign !== '1') {
    btns.push(setJudgeBtn())
  }
  if (judge_score && parseFloat(judge_score) < 0.5 && artificial_judge_sign === '') {
    btns.push(setArtifBtn())
  }
  const ARTIF_STATUS_ENUMS = {
    '1': '审核中',
    '2': '审核通过',
    '3': '审核驳回'
  }

  return (
    <Card
      className="img-card-warpper"
      style={{ width: '18.5%' }}
      bodyStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      actions={btns}
    >
      <Image src={`${WEB_SERVE}/${img_path}`} />
      <div>
        <div>得分: {parseFloat(judge_score).toFixed(2)}</div>
        {artificial_judge_sign !== '' && <div>人工审核状态: {`${ARTIF_STATUS_ENUMS[artificial_judge_sign]}`}</div>}
        {judge_sign === '1' && <div>被选为裁判中</div>}
      </div>
    </Card>
  )
}

export default ImgCard;
