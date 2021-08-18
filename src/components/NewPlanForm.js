import { useState } from 'react';

const NewPlanForm = (props) => {

    const [formFields, setFormFields] = useState({
        plan_name: ''
    });

    const onTitleChange = (event) => {
        setFormFields({
            ...formFields,
            plan_name: event.target.value
        })
    };

    const onSubmit= (event) => {
        event.preventDefault();
        props.createNewPlan(formFields);
      };

    return (
        <form onSubmit={onSubmit}>
            <div className="plan_form">
                <label htmlFor="plan_name">Plan Title:&nbsp;</label>
                <input
                    id = "plan_name"
                    name="plan_name"
                    value={formFields.plan_name}
                    onChange={onTitleChange} />
            </div>
            <input className='add_board_btn'
                type="submit"
                value="Add Plan"
                disabled={formFields.plan_name === ''}
            />
        </form>
    );
};

export default NewPlanForm;