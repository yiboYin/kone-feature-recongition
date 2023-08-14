import React from 'react';
import { ImgCardProps, imageItem } from '@/utils/interfaces'
import { Card, Image, message, Tooltip } from 'antd';
import './ImgCard.less'
import { HighlightOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { WEB_SERVE } from '@/utils/constants';
import { generateJudgment } from '@/services/apis';

const ImgCard = ({ imgItem, initImgList }: ImgCardProps) => {
  const { img_path, artificial_judge_sign, judge_score, judge_sign } = imgItem

  let btns = [];
  const setJudgeBtn = () => {
    const clickHandler = async () => {
      const fileName = img_path.split('/').pop();
      const {success} = await generateJudgment({ids: [fileName] });
      if (success) {
        message.success('设置成功！')
        initImgList()
      } else {
        message.error('设置失败！')
      }
    }
    return (
      <Tooltip title="设为裁判">
        <HighlightOutlined key='judge' onClick={clickHandler} style={{color: 'green'}} />
      </Tooltip>
    )
  }

  const setArtifBtn = () => {
    const clickHandler = () => {
      console.log('say hello2')
    }
    return (
      <Tooltip title="申请人工复核">
        <ExclamationCircleOutlined key='artif' onClick={clickHandler} style={{color: 'orange'}} />
      </Tooltip>
    )
  }

  if (judge_score && parseFloat(judge_score) >= 0.5 && judge_sign !== '1') {
    btns.push(setJudgeBtn())
  }
  if (judge_score && parseFloat(judge_score) < 0.5 && artificial_judge_sign === '') {
    btns.push(setArtifBtn(imgItem))
  }
  const ARTIF_STATUS_ENUMS = {
    '1': '审核中',
    '2': '审核通过',
    '3': '审核驳回'
  }
  const score = (Math.min(parseFloat(judge_score) * 100, 100)).toFixed(2)
  const scoreColor = judge_sign === '1' ? 'blue' : score > 70 ? 'green' : score <= 50 ? 'orange' : '';

  return (
    <Card
      className={`img-card-warpper${scoreColor ? (' card-border border-color-' + scoreColor) : ''}`}
      style={{ width: '18.5%' }}
      bodyStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      actions={btns}
    >
      <Image src={`${WEB_SERVE}/${img_path}`} />
      <div class="card-info">
        <div class="score-wrapper">
          <label>置信度: </label>
          <span className={`img-card-warpper ${scoreColor ? ('text-color-' + scoreColor) : ''}`}>{`${score} %`}</span>
        </div>
        {artificial_judge_sign !== '' && <div>人工审核状态: {`${ARTIF_STATUS_ENUMS[artificial_judge_sign]}`}</div>}
        {judge_sign === '1' && <div>被选为裁判中</div>}
      </div>
    </Card>
  )
}

export default ImgCard;
