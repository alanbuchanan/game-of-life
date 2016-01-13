const Main = React.createClass({

    getInitialState() {
        return {
            numCols: 5,
            numRows: 5,
            grandArr: []
        }    
    },

    componentDidMount() {
        // this.initBoard();

    },

    clearBoard() {},
    resumeBoard() {},
    pauseBoard() {},
    

    initBoard() {

    },

    hello(key) {
        console.log(key)
        let elemToChange = document.getElementById(key);
        $(elemToChange).attr('class', 'populated')
    },

    render() {

        let {numCols, numRows} = this.state;
        
        let grandArr = [];
        let tds = [];

        for(let i = 0; i < numRows; i++){
            let subArr = [];
            for(let j = 0; j < numCols; j++){
                subArr.push('empty')
                let key = i + '_' + j
            }
            grandArr.push(subArr);
            this.setState({grandArr: grandArr})
        }

        const getTds = (i) => {
            return _.times(numCols, (j) => {
                let key = i + '_' + j
                return <td 
                        id={key} 
                        key={j} 
                        onClick={this.hello.bind(null, key)}
                        className={grandArr[i][j]}
                >
                </td>
            })
        }

        let tableBody = _.times(numRows, (i) => {
            return <tr key={i}>
                {getTds(i)}
            </tr>
        })

        console.log(grandArr)
        console.log('some num:', grandArr[1][4])

        return (
            <table border="1" cellPadding="0" cellSpacing="0">
                <tbody>
                    {tableBody}
                </tbody>
            </table>
        )
    }
})

ReactDOM.render(<Main />, document.getElementById('root'))