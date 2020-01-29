import React from 'react';
import DatePicker from "react-datepicker";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';
import { yellow } from '@material-ui/core/colors';
import { green } from '@material-ui/core/colors';


const PinkRadio = withStyles({
    root: {
        color: pink[400],
        '&$checked': {
            color: pink[600],
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
    root: {
        color: yellow[400],
        '&$checked': {
            color: yellow[600],
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);


export class TodoForm extends React.Component {
    constructor() {
        super();
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            selected: 'radio-1',
            level: '0'
        };
        this.addTask = this.addTask.bind(this);
        this.levelChange = this.levelChange.bind(this);
    }

    addTask(e) {
        e.preventDefault();
        var titleInp = document.getElementById('title');
        var title = titleInp.value;
        titleInp.value = '';
        var bodyInp = document.getElementById('body');
        var body = bodyInp.value;
        bodyInp.value = '';
        var start = this.state.startDate
        var end = this.state.endDate
        var level = this.state.level
        this.props.addTask(title, body, start, end, level);
    }

    setStartDate = date => {
        this.setState({
            startDate: date
        });
    };

    setEndDate = date => {
        if (date > this.state.startDate) {
            this.setState({
                endDate: date
            });
        }
    };

    levelChange = event => {
        this.setState({
            level: event.target.value
        });
    };

    render() {
        return (
            <div>
                <div className="todo type1">
                    <form className="input-wrapper" onSubmit={this.addTask}>
                        <input id="title" type="text" className="add-todo" name="add-todo" placeholder="タイトル" style={{height:'30px'}}/>
                        <input id="body" type="text" className="add-todo" name="add-todo" placeholder="説明" />
                        <center>
                            <div>
                                Start
                            <DatePicker
                                    selected={this.state.startDate}
                                    onChange={date => this.setStartDate(date)}
                                    showTimeSelect
                                    timeFormat="p"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="Pp"
                                    width="200px"
                                />&nbsp;
                                End
                            <DatePicker
                                    selected={this.state.endDate}
                                    onChange={date => this.setEndDate(date)}
                                    showTimeSelect
                                    timeFormat="p"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="Pp"
                                    width="200px"
                                />
                            </div>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">レベル</FormLabel>
                                <RadioGroup aria-label="position" name="position" value={this.state.level} onChange={this.levelChange} row>
                                    <FormControlLabel
                                        value="2"
                                        control={<PinkRadio />}
                                        label="High"
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="1"
                                        control={<YellowRadio />}
                                        label="Midiun"
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="0"
                                        control={<GreenRadio />}
                                        label="Low"
                                        labelPlacement="start"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </center>

                    </form>
                </div>
                <button type="button" onClick={this.addTask} className="add-btn" />
            </div>
        )
    }
}
