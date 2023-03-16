import React, {useCallback, useEffect} from 'react';
import rickMortyLogo from "../../common/images/rick_and_morty_logo.png";
import style from './mainPageStyles.module.css'
import {FetchCurrentPageTC} from "../../redux/character-reducer";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import Preloader from "../../common/preloader/Preloader";
import {SetFormValueAC} from "../../redux/search-name-reducer";
import CurrentCharacter from "../Current Character Page/Currecnt Character/CurrentCharacter";
import Pagination from "../Pagination/Pagination";
import {useParams} from "react-router-dom";


const MainPage = () => {


    const dispatch = useAppDispatch()
    const characters = useAppSelector(state => state.characterReducer.results)
    const isFetching = useAppSelector(state => state.characterReducer.isFetching)
    const searchValue = useAppSelector(state => state.searchName.formValue)
    let param = useParams()
    const portionPageSize = 10;


    //form values

    const onChangeFormValueHandler = useCallback(function (event: React.ChangeEvent<HTMLInputElement>) {
        localStorage.setItem('inputValue', event.currentTarget.value);
        dispatch(SetFormValueAC(event.currentTarget.value))
    }, [dispatch])

    //form values

    const filteredCharacters = characters.filter(current => current.name.toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase()))


    useEffect(() => {
        const value = localStorage.getItem('inputValue')
        console.log(value)
        if (value !== null) {
            dispatch(SetFormValueAC(value))
        }
    }, [dispatch])


    useEffect(() => {
        dispatch(FetchCurrentPageTC(+param.pageID!))
    }, [dispatch,param.pageID])


    return (
        <div className={style.mainContainer}>

            <div className={style.firstContainer}>
                <img className={style.rickMortyLogo} src={rickMortyLogo} alt="rick_and_morty_logo"/>
                <form className={style.form}>
                    <input placeholder={'Filter by name...'}
                           className={style.inputWithSearchLogo}
                           onChange={(event) => onChangeFormValueHandler(event)}
                           value={searchValue}
                           autoFocus={true}
                    />
                </form>
            </div>

            <div className={style.secondContainer}>
                {isFetching ? <div className={style.preloaderPage}><Preloader/></div>
                    : filteredCharacters.map((ch, index) => {
                        return <CurrentCharacter ch={ch} key={index}/>
                    })
                }

            </div>
            <Pagination param={param.pageID!} portionSize={portionPageSize}/>
        </div>
    );
};

export default MainPage;