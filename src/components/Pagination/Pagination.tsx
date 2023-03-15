import React, {useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {Link} from "react-router-dom";
import Button from "../Button/Button";
import {FetchCurrentPageTC} from "../../redux/character-reducer";
import style from './pagination.module.css'

const Pagination = React.memo((props: PaginationPropsTypes) => {

    const [portionNumber, setPortionNumber] = useState(1)

    // -------------------------------------------
    const {param, portionSize} = props
    const summaryCharacters = useAppSelector(state => state.characterReducer.info.count)
    const dispatch = useAppDispatch()

    const totalPagesCount = Math.ceil(summaryCharacters / 20)
    let pagesCount = []

    for (let i = 1; i <= totalPagesCount; i++) {
        pagesCount.push(i)
    }

    const callback = useCallback(() => {
        if (param) {
            dispatch(FetchCurrentPageTC(+param))
        }
    }, [dispatch, param])
    // -------------------------------------------------


    let blockPortionsCount = Math.ceil(totalPagesCount / portionSize)//кол-во порций-блоков
    let leftPortionValue: number = (portionNumber - 1) * portionSize + 1
    let rightPortionNumber: number = portionNumber * portionSize

    console.log(portionNumber)


    //---------------------------paginator

// ---------------------------------------------

    const prevPaginationHandler = () => {
        if (portionNumber > 1)
            setPortionNumber(portionNumber - 1)
    }
    const nextPaginationHandler = () => {
        if (portionNumber < 5)
            setPortionNumber(portionNumber + 1)
    }

    return (
        <div className={style.paginationBlock}>
            <button className={style.button} onClick={prevPaginationHandler}>{`prev`}</button>
            {pagesCount.filter(p => {
                return p >= leftPortionValue && p <= rightPortionNumber
            }).map(pages => {
                return <span key={pages}>
                        <Link to={`/main/${pages}`}>
                            <Button name={pages} callback={callback}/>
                        </Link>
                </span>
            })
            }
            <button className={style.button} onClick={nextPaginationHandler}>{`next`}</button>
        </div>
    );
    // ---------------------------------------------
});

export default Pagination;

//types

type PaginationPropsTypes = {
    param: string
    portionSize: number
}