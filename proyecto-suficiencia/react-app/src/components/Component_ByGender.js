import React from 'react';

export default class Component_ByGender extends React.Component {
    state = {
        male : [],
        female : []
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/mongo/')
        .then(res => res.json())
        .then((data) => {
            this.setState({ male : data.data.male });
            this.setState({ female : data.data.female });
        })
        .catch(console.log);
    }

    

    render() {
        return (
            <div>
                <table style={{style: "float: left"}} border="1px">
                    <thead>
                        <tr>
                            <th style={{backgroundColor: "pink", textAlign:"center", width : 300}}>LOCATION</th>
                            <th style={{backgroundColor: "pink", textAlign:"center", width : 100}}>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.state.female.map( person => 
                        <tr style={{ border:"1"}}>
                            <td style={{textAlign:"center"}}>{ person._id.location }</td>
                            <td style={{textAlign:"center"}}>{ person.total }</td>
                        </tr>
                        )}
                    </tbody>
                </table>
                <br/>
                <table style={{style: "float: left"}} border="1px">
                    <thead>
                        <tr>
                            <th style={{backgroundColor: "lightblue", textAlign:"center", width : 300}}>LOCATION</th>
                            <th style={{backgroundColor: "lightblue", textAlign:"center", width : 100}}>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.state.male.map( person => 
                        <tr style={{ border:"1"}}>
                            <td style={{textAlign:"center"}}>{ person._id.location }</td>
                            <td style={{textAlign:"center"}}>{ person.total }</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}