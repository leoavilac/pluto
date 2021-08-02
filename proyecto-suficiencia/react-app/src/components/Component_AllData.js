import React from 'react';
//import axios from 'axios';

export default class Component_AllData extends React.Component {
    state = {
        persons : []
    }
    
    componentDidMount() {
        fetch('http://34.125.192.186:3001/api/')
        .then(res => res.json())
        .then((data) => {
            this.setState({ persons : data.data.persons })
        })
        .catch(console.log);
    }

    

    render() {
        return (
            <div>
                <table border="1">
                    <thead>
                        <tr>
                            <th style={{backgroundColor: "lightgray", textAlign:"center", width : 300}}>NAME</th>
                            <th style={{backgroundColor: "lightgray", textAlign:"center", width : 100}}>GENDER</th>
                            <th style={{backgroundColor: "lightgray", textAlign:"center", width : 300}}>LOCATION</th>
                            <th style={{backgroundColor: "lightgray", textAlign:"center", width : 70}}>AGE</th>
                            <th style={{backgroundColor: "lightgray", textAlign:"center", width : 120}}>VACCINE TYPE</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.persons.reverse().map( person => 
                        <tr style={{ border:"1"}}>
                            <td>{ person.name }</td>
                            <td style={{textAlign:"center"}}>{ person.gender }</td>
                            <td style={{textAlign:"center"}}>{ person.location }</td>
                            <td style={{textAlign:"center"}}>{ person.age }</td>
                            <td style={{textAlign:"center"}}>{ person.vaccine_type }</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}