import React, { useState, useRef, FC, useCallback } from 'react'
import { Tag, Input, Tooltip, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styles from './Tag.module.scss'
import { observer } from 'mobx-react'
// import { useMetaStore } from '@/hooks'

export const EditableTagGroup: FC<{ onTagsChanged: (tags: string[]) => void }> =
  observer(({ onTagsChanged }) => {
    const [tags, setTags] = useState([])
    const [inputVisible, setInputVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const handleClose = (removedTag) => {
      const newTags = tags.filter((tag) => tag !== removedTag)
      setTags(newTags)
      onTagsChanged(newTags) // 触发回调
    }

    const showInput = () => {
      setInputVisible(true)
    }

    const handleInputChange = (e) => {
      setInputValue(e.target.value)
    }

    const handleInputConfirm = () => {
      let newTags = [...tags]
      if (inputValue && tags.indexOf(inputValue) === -1) {
        newTags = [...tags, inputValue]
        setTags(newTags)
      }
      setInputVisible(false)
      setInputValue('')
      onTagsChanged(newTags) // 触发回调
    }

    return (
      <>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20
          const tagElem = (
            <Tag
              className={styles['edit-tag']}
              key={tag}
              closable={index !== -1}
              onClose={() => handleClose(tag)}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          )
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}
        {inputVisible && (
          <Input
            type="text"
            size="large"
            className={styles['tag-input']}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag className={styles['site-tag-plus']} onClick={showInput}>
            <PlusOutlined rev={undefined} /> Add
          </Tag>
        )}
      </>
    )
  })
