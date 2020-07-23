import React from 'react';
import { useForm } from 'react-hook-form';
import './resetPassword.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createNewPassword, requestNewPassword } from '../../store/actions/auth';

function ResetPassword(props) {

    const { register, handleSubmit, errors, watch } = useForm();
    
    localStorage.clear();

    return <div id="resetPassword">
        <form onSubmit={handleSubmit((data) => {

            requestNewPassword({ 
                // token: props.match.params.token, 
                email: data.email 
            });
            
        })}>
            <div class="row">
                <div class="input-field col s12">
                    <input id="email" type="email" class="validate" name="email" ref={register({ required: true })} />
                    <label for="email">Email</label>
                    {errors.email && errors.email.type === 'required' && <span id="errors" class="helper-text" > This field is Required</span>}
                </div>
            </div>

       
            <div class="card-action">

                <button class="btn waves-effect waves-light" type="submit" name="action">Request Password
                </button>
            </div>

        </form>
    </div>
}


export default connect(null, { })(withRouter(ResetPassword));