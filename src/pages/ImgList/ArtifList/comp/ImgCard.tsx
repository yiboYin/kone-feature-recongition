import React, { useState, useEffect } from 'react';
import { ImgCardProps } from '@/utils/interfaces'
import { Card, Image, message, Tooltip } from 'antd';
import './ImgCard.less'
import { WEB_SERVE } from '@/utils/constants';
import { HighlightOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { generateJudgment, SubAudit } from '@/services/apis';

const ImgCard = ({ imgItem, initImgList }: ImgCardProps) => {
  const { img_path, artificial_judge_sign, judge_score, judge_sign } = imgItem
  const fileName = img_path.split('/').pop();

  let btns = [];
  const setJudgeBtn = () => {
    const clickHandler = async () => {
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

  const setConfirmBtn = () => {
    const clickHandler = async () => {
      const {success} = await SubAudit({ids: [fileName], artificial_judge_sign: 2 });
      if (success) {
        message.success('审核成功！')
        initImgList()
      } else {
        message.error('审核失败！')
      }
    }
    return (
      <Tooltip title="审核通过">
        <CheckOutlined key='confirm' onClick={clickHandler} style={{color: 'green'}} />
      </Tooltip>
    )
  }

  const setRejectBtn = () => {
    const clickHandler = async () => {
      const {success} = await SubAudit({ids: [fileName], artificial_judge_sign: 3 });
      if (success) {
        message.success('审核成功！')
        initImgList()
      } else {
        message.error('审核失败！')
      }
    }
    return (
      <Tooltip title="审核驳回">
        <CloseOutlined key='reject' onClick={clickHandler} style={{color: 'red'}} />
      </Tooltip>
    )
  }
  if (artificial_judge_sign === '1') {
    btns.push(setConfirmBtn())
    btns.push(setRejectBtn())
  }
  if (artificial_judge_sign === '2' && judge_sign !== '1' ) {
    btns.push(setJudgeBtn())
  }
  const score = parseFloat((Math.min(parseFloat(judge_score) * 100, 100)).toFixed(2))
  const [scoreColor, setScoreColor] = useState('');
  useEffect(() => {
    let color = '';
    if (judge_sign === '1') {
      color = 'blue'
    } else if (artificial_judge_sign === '2' || score > 70 ) {
      color = 'green'
    } else if (artificial_judge_sign === '3') {
      color = 'red'
    } else if (artificial_judge_sign === '1' || score <= 50) {
      color = 'orange'
    }
    setScoreColor(color)
  }, [judge_sign, artificial_judge_sign, score])
  const ARTIF_STATUS_ENUMS = {
    '1': '审核中',
    '2': '审核通过',
    '3': '审核驳回'
  }

  return (
    <Card
      className={`img-card-warpper${scoreColor ? (' card-border border-color-' + scoreColor) : ''}`}
      style={{ width: '18.5%' }}
      bodyStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      actions={btns}
    >
      <Image src={`${WEB_SERVE}/${img_path}`} />
      <div className="card-info">
        <div className="score-wrapper">
          <label>置信度: </label>
          <span className={`img-card-warpper ${scoreColor ? ('text-color-' + scoreColor) : ''}`}>{`${score} %`}</span>
        </div>
        {
          artificial_judge_sign !== '' &&
          <div className="score-wrapper">
            <label>人工审核状态: </label>
            <span className={`img-card-warpper ${scoreColor ? ('text-color-' + scoreColor) : ''}`}>{`${ARTIF_STATUS_ENUMS[artificial_judge_sign]}`}</span>
          </div>
        }
        {judge_sign === '1' && <div>被选为裁判中</div>}
      </div>
    </Card>
  )
}

export default ImgCard;
