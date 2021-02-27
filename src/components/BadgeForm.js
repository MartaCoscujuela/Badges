import React from "react";

class BadgeForm extends React.Component{
    state = {
        jobTitle: 'Designer'
    }

    render() {
        console.log(this.props);
        return (
            <>
                <form onSubmit={this.props.onSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input 
                            onChange={this.props.onChange} 
                            className="form-control" 
                            type="text" 
                            name="firstName" 
                            value={this.props.formValues.firstName}>                          
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input 
                            onChange={this.props.onChange} 
                            className="form-control" 
                            type="text" 
                            name="lastName" 
                            value={this.props.formValues.lastName}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            onChange={this.props.onChange} 
                            className="form-control" 
                            type="email" 
                            name="email" 
                            value={this.props.formValues.email}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Job title</label>
                        <input 
                            onChange={this.props.onChange} 
                            className="form-control" 
                            type="text" 
                            name="jobTitle" 
                            value={this.props.formValues.jobTitle}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Twitter</label>
                        <input 
                            onChange={this.props.onChange} 
                            className="form-control" 
                            type="text" 
                            name="twitter" 
                            value={this.props.formValues.twitter}></input>
                    </div>
                    <button className="btn btn-primary">Save</button>

                    
                    {
                        this.props.error && (<p className="text-danger">{
                            this.props.error.message}</p>)
                    }
                
                </form>
            </>
        )
    }
}

export default BadgeForm;