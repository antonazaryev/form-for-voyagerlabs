import React, {Component} from 'react';
import '../styles/form.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Worplace from "./workplace";

export default class Form extends Component {
    state = {
        loading: false,
        submitted: false,
        firstName: null,
        lastName: null,
        workplaces: [],
    };

    handleSubmit = (event) => {
        const { firstName, lastName, workplaces } = this.state;

        let validForm = true;
        if (firstName === null || firstName === '') {
            this.setState({ firstName: '' });
            validForm = false;
        }
        if (lastName === null || lastName === '') {
            this.setState({ lastName: '' });
            validForm = false;
        }

        for (let i = 0; i < workplaces.length; i++) {
            if (workplaces[i].name === null || workplaces[i].name === '') {
                workplaces[i].name = '';
                validForm = false;
            }
        }

        this.setState(workplaces);

        if (!validForm) {
            event.preventDefault();
        } else {
            this.setState({ loading: true, submitted: true });
            setTimeout(() => {
                this.setState({ loading: false });
                console.log(firstName, lastName, workplaces);
            }, 2000);
        }
    };

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    };

    handleChangeWorkplace = (change, index) => {
        const { workplaces } = this.state;
        const workplace = workplaces[index];
        workplaces[index] = { ...workplace, ...change };
        this.setState({ workplaces });
    };

    handleAddWorkplace = () => {
        this.setState({workplaces: [...this.state.workplaces, {
                id: new Date().getUTCMilliseconds(),
                name: null,
                startDate: undefined,
                endDate: undefined,
            }]})
    };

    handleDeleteWorkplace = (index) => {
        const workplaces = this.state.workplaces;
        workplaces.splice(index, 1);
        this.setState({ workplaces })
    };

    render() {
        const { loading, submitted, firstName, lastName, workplaces } = this.state;

        return (
            <div className="form">
                <div className="form-item">
                    <TextField
                        id="firstName"
                        label="First name"
                        error={ firstName === '' }
                        helperText={ firstName === '' ? 'Required' : '' }
                        disabled={ submitted }
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-item">
                    <TextField
                        id="lastName"
                        label="Last name"
                        error={ lastName === '' }
                        helperText={ lastName === '' ? 'Required' : '' }
                        disabled={ submitted }
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-item">
                    <div className="form-workspace-title">
                        <Typography>
                            Workplaces:
                        </Typography>
                        {
                            !submitted && !loading && (
                                <Fab color="primary" aria-label="Add" size='small'>
                                    <AddIcon onClick={ this.handleAddWorkplace } />
                                </Fab>
                            )
                        }
                    </div>
                    {
                        workplaces.map((workplace, index) =>
                            <Worplace
                                key={ workplace.id }
                                workplace={ workplace }
                                onChange={(change) => this.handleChangeWorkplace(change, index)}
                                onDelete={() => this.handleDeleteWorkplace(index)}
                                disabled={ submitted || loading }
                            />
                        )
                    }
                </div>
                <div className="form-item form-submit">
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={ submitted }
                        onClick={this.handleSubmit}
                    >
                        { submitted && !loading ? 'Submitted' : 'Submit' }
                    </Button>
                    { loading && <CircularProgress size={24} className="form-progress" /> }
                </div>
            </div>
        );
    }
}
