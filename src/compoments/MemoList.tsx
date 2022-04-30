import MemoListItem from './MemoListItem'
import { useRecoilState } from 'recoil'
import { atoms } from '../atoms/atoms'

const MemoList = () => {
    const [memoList, setMemoList] = useRecoilState(atoms.memoList)

    return (
        <>
            {
                memoList.map(memo => (
                    <MemoListItem
                        memo={ memo }
                        key={ memo.id }
                    />
                ))
            }
        </>
    )
}

export default MemoList
