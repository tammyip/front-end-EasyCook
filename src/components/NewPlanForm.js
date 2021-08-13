import { useState } from 'react';

const NewPlanForm = (props) => {

    const [formFields, setFormFields] = useState({
        title: ''
    });

    const onTitleChange = (event) => {
        setFormFields({
            ...formFields,
            title: event.target.value
        })
    };

    const onSubmit= (event) => {
        event.preventDefault();
        props.createNewPlan(formFields);
      };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="title">Plan Title: </label>
                <input
                    name="title"
                    value={formFields.title}
                    onChange={onTitleChange} />
            </div>
            <input className='add_board_btn'
                type="submit"
                value="Add Plan"
                disabled={formFields.title === ''}
            />
        </form>
    );
};

export default NewPlanForm;