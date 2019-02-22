
import React, { Component } from 'react';
import Moment from 'react-moment';

class StockLanding extends Component {
    constructor(props) {
        super(props)
            this.state = {
                ticker: null,
                error: null,
                loading: true
            }
    }

    componentDidMount() {
        this.loadTickers();
    } 

    loadTickers() {
        this.setState({
            error: null,
            loading: true
        });
        fetch('https://api.iextrading.com/1.0/tops?symbols=fb,aapl,amzn,nflx,goog')
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.statusText);
                }
                return res.json();
            })
            .then(tickerInfo => 
                this.setState({
                    ticker: tickerInfo,
                    loading: false
                })
            )
            .catch(err => 
                this.setState({
                    error: 'Could not load board',
                    loading: false
                })
            );
    }
    render() {
        const {ticker, error, loading} = this.state;
        let body;
        if(loading) {
            body = (
                <div className='load'><p>Loading</p></div>
            )
        }
        else if(error) {
            body = (
                <div className='err'><p>{error}</p></div>
            )
        }
        else {
            body = (
                    <table>
                        <tbody>
                        <tr>
                            <th>Symbol</th>
                            <th>Last Sale Price</th>
                            <th>Last Updated</th>
                        </tr>
                        {ticker.map((stock, index) => (
                            <tr key={index}>
                                <td>{stock.symbol}</td>
                                <td>{stock.lastSalePrice}</td>
                                <td><Moment format='MM-DD-YYYY HH:mm'>{stock.lastUpdated}</Moment></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>        
            )    
        }
        return (
            <div className='stockTable'>
                {body}
            </div>
            
        );
    }
}

export default StockLanding;