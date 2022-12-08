import MemoListItem from './MemoListItem'
import { useRecoilValue } from 'recoil'
import { atoms } from '../atoms/atoms'
import MemoKeywordFilter from './MemoKeywordFilter';
import { useMemo } from 'react';

const MemoList = () => {
  const memoList = useRecoilValue(atoms.memoList)
  const memoKeyword = useRecoilValue(atoms.memoKeyword)
  const memoShowList = useMemo(() => memoList.filter(
    item => item.id.includes(memoKeyword) ||
      item.content.includes(memoKeyword) ||
      item.userId.includes(memoKeyword) ||
      item.createdAt.includes(memoKeyword)
  ), [memoList, memoKeyword])

  return (
    <>
      <MemoKeywordFilter/>
      {
        memoShowList.map(memo => (
          <MemoListItem
            memo={memo}
            key={memo.id}
          />
        ))
      }
    </>
  )
}

export default MemoList
