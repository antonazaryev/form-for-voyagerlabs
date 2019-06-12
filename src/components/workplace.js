import React from 'react';
import '../styles/workplace.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export default function Workplace(props) {
    const {
        workplace: { startDate, endDate, name },
        onChange,
        onDelete,
        disabled,
    } = props;

    return (
        <Card className="workplace">
            <CardContent>
                    <TextField
                        id="workplaceName"
                        label="Workplace name"
                        error={ name === '' }
                        helperText={ name === '' ? 'Required' : '' }
                        onChange={(e) => onChange({ name: e.target.value })}
                        disabled={ disabled }
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            label="Working period - start date"
                            value={startDate}
                            onChange={(startDate) => onChange({ startDate })}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            disabled={ disabled }
                        />
                        <KeyboardDatePicker
                            margin="normal"
                            label="Working period - end date"
                            value={endDate}
                            onChange={(endDate) => onChange({ endDate })}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            disabled={ disabled }
                        />
                    </MuiPickersUtilsProvider>
                <div className="form-item">

                </div>
            </CardContent>
            {
                !disabled && (
                    <CardActions disableSpacing>
                        <IconButton aria-label="Delete" onClick={ onDelete }>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                )
            }
        </Card>
    );
}
