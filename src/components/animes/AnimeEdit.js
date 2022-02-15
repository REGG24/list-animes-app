import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Card from "../UI/Card";
import classes from './AnimeEdit.module.css';

const AnimeEdit = (props) => {
    let formIsValid = true;
    let formClasses = 'btn';

    const validate = (values) => {
        const errors = {};
      
        if(!values.name){
          errors.name = 'Name must not be empty';
        } 

        if(!values.description || values.description.length < 30){
            errors.description = 'Description must not be empty and must be at least 30 characters'
        }

        if(!values.imagePath){
            errors.imagePath = 'Url must not be empty';
        }

        const errorSize = Object.keys(errors).length;

        errorSize > 0 ? formIsValid = false : formIsValid = true;
        formClasses = formIsValid ? 'btn' : 'invalid-btn';

        return errors
    }

   

    return (
        <Card>
            <h1>Edit Anime</h1>
            {props.anime &&
            <Formik
                initialValues={{ 
                    name: props.anime.name, 
                    description: props.anime.description,
                    author: props.anime.author,
                    finalized: props.anime.finalized,
                    actualChapter: props.anime.actualChapter,
                    imagePath: props.anime.imagePath 
                }}
                validate={validate}
                onSubmit={async (values) => {
                    const animeData = {
                        _id: props.anime._id,
                        ...values
                    }
                    props.onEditAnime(animeData);
                }}
            >
                <Form>
                    <div className={classes.control}>
                        <label htmlFor='name'>Name</label>
                        <Field name="name" type="text" required />
                        <ErrorMessage name='name' render={msg => <p className="error-text"><small>{msg}</small></p>} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='descripton'>Description</label>
                        <Field as='textarea' name="description" required/>
                        <ErrorMessage name='description' render={msg => <p className="error-text"><small>{msg}</small></p>} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='author'>Author</label>
                        <Field name="author" type="text" />
                    </div>
                    <div className={classes['details-row']}>
                        <div className={classes['column']}>
                            <label htmlFor='finalized'>Finalized</label>
                            <Field type="checkbox" name="finalized" />
                        </div>
                        <div className={classes['column']}>
                            <label htmlFor='actualChapter'>Capitulo Actual</label>
                            <Field name="actualChapter" type="text" />
                        </div>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='imagePath'>Image url</label>
                        <Field name="imagePath" type="text" required/>
                        <ErrorMessage name='imagePath' render={msg => <p className="error-text"><small>{msg}</small></p>} />
                    </div>
                    
                    <button className={formClasses} type="submit" disabled={!formIsValid}>Save</button>
                </Form>
            </Formik>
            }
        </Card>
      );
};

export default AnimeEdit;