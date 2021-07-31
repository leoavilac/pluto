import React from 'react';

export default class Component_TopTen extends React.Component {
    state = {
        countries : []
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/redis/')
        .then(res => res.json())
        .then((data) => {
            this.setState({ countries : data.data.countries })
        })
        .catch(console.log);
    }

    

    render() {
        return (
            <div>
                <table border="1">
                    <thead>
                        <tr>
                            <th style={{backgroundColor: "lightgray", textAlign:"center", width : 300}}>LOCATION</th>
                            <th style={{backgroundColor: "lightgray", textAlign:"center", width : 100}}>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.countries.map( country => 
                        <tr>
                            <td style={{textAlign:"center"}}>{ country.lugar }</td>
                            <td style={{textAlign:"center"}}>{ country.cantidad }</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}