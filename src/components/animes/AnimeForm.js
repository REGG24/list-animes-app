import classes from './AnimeForm.module.css';
import Card from '../UI/Card';
import { useState } from 'react';
import useInput from '../../hooks/use-input';

const isNotEmpty = value => value.trim() !== '';
const length = value => value.trim() !== '' && value.length >= 30;

const AnimeForm = (props) => {
    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        valueBlurHandler: nameBlurHandler,
        reset: resetName
    } = useInput(isNotEmpty);

    const {
        value: descriptionValue,
        isValid: descriptionIsValid,
        hasError: descriptionHasError,
        valueChangeHandler: descriptionChangeHandler,
        valueBlurHandler: descriptionBlurHandler,
        reset: resetDescription
    } = useInput(length);

    const {
        value: urlValue,
        isValid: urlIsValid,
        hasError: urlHasError,
        valueChangeHandler: urlChangeHandler,
        valueBlurHandler: urlBlurHandler,
        reset: resetUrl
    } = useInput(isNotEmpty);

    const [data, setData] = useState({
        author: '',
        finalized: false,
        actualChapter: 0
    });

    let formIsValid = false;

    if(nameIsValid && descriptionIsValid & urlIsValid){
        formIsValid = true;
    }

    function submitFormHandler(event) {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        const animeObj = {
            name: nameValue,
            description: descriptionValue,
            author: data.author,
            finalized: data.finalized,
            actualChapter: data.actualChapter,
            imagePath: urlValue
        }

        props.onAddAnime(animeObj);

        resetName();
        resetDescription();
        resetUrl();
        data.author='';
        data.actualChapter='';
    }

    const formClasses = formIsValid ? 'btn' : 'invalid-btn';

    return(
        <Card>
            <form onSubmit={submitFormHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Name</label>
                <input 
                    type='text' 
                    id='name' 
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    value={nameValue}
                    required 
                />
                {nameHasError && <p className="error-text"><small>Name must not be empty</small></p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='description'>Description</label>
                <textarea 
                    id='description' 
                    rows='4' 
                    onChange={descriptionChangeHandler}
                    onBlur={descriptionBlurHandler}
                    value={descriptionValue}
                    required 
                />
                {descriptionHasError && <p className="error-text"><small>Description must not be empty and must be at least 30 characters</small></p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='author'>Author</label>
                <input 
                    type='text' 
                    id='author' 
                    onChange={(event) => setData({...data, author: event.target.value})}
                    value={data.author}
                />
            </div>
            <div className={classes['details-row']}>
                <div className={classes['column']}>
                    <label htmlFor='finalized'>Finalized</label>
                    <input 
                        type='checkbox' 
                        id='finalized' 
                        onChange={(event) => setData({...data, finalized: event.target.checked})} 
                    />
                </div>
                <div className={classes['column']}>
                    <label htmlFor='chapter'>Capitulo Actual</label>
                    <input 
                        type='text' 
                        id='chapter'
                        onChange={(event) => setData({...data, actualChapter: event.target.value})} 
                        value={data.actualChapter}
                    />
                </div>
            </div>
            <div className={classes.control}>
                <label htmlFor='imagePath'>Image url</label>
                <input 
                    type='text' 
                    id='imagePath' 
                    onChange={urlChangeHandler}   
                    onBlur={urlBlurHandler}
                    value={urlValue}
                    required  
                />
                {urlHasError && <p className="error-text"><small>Url must not be empty</small></p>}
            </div>
            <div className={classes.actions}>
            <button className={formClasses} disabled={!formIsValid}>Add Anime</button>
          </div>
        </form>
        </Card> 
    )
};

export default AnimeForm;