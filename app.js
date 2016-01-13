const Main = React.createClass({

    getInitialState() {
        return {
            numCols: 50,
            numRows: 50,
            grandArr: [],
            intervalId: 0,
            interval: 1000,
            generationsCount: 0
        }    
    },

    componentDidMount() {
        this.setRandomisedArray();
        this.resumeBoard();
    },

    componentWillUnmount () {
        clearInterval(this.state.intervalId);
    },

    clearBoard() {
        console.log('yes')
        clearInterval(this.state.intervalId);
        this.setBlankArray();
        this.setState({generationsCount: 0})
        this.setState({intervalId: clearInterval(this.state.intervalId)})
    },

    resumeBoard() {
        let intervalId = setInterval(this.nextGen, this.state.interval);
        this.setState({intervalID: intervalId});
    },
    
    nextGen() {
        this.setState({generationsCount: ++this.state.generationsCount})
        const {grandArr} = this.state;
        let newArr = grandArr.slice();
        newArr[32][32] = 'populated';
        this.setState({grandArr: newArr})
    },

    pauseBoard() {},

    setRandomisedArray () {
        let {numCols, numRows} = this.state;
        let arr = [];
        
        let myArr = Date.now().toString().split('');
        console.log(myArr)

        for(let i = 0; i < numRows; i++){
            let subArr = [];
            for(let j = 0; j < numCols; j++){
                if(j.toString().split('').indexOf(myArr[1]) !== -1) {
                    subArr.push('populated')
                } else {
                    subArr.push('empty')
                }
                myArr = _.shuffle(myArr)
            }
            arr.push(subArr);
        }
        this.setState({grandArr: arr})
    },

    //TODO: go through the array, evaluating each cell, and doing something with it depending on its array value
    // Start with the `nextGen()` method because that's probably where it should be started
    setBlankArray() {
        let {numCols, numRows} = this.state;
        
        let arr = [];

        for(let i = 0; i < numRows; i++){
            let subArr = [];
            for(let j = 0; j < numCols; j++){
                subArr.push('empty')
                let key = i + '_' + j
            }
            arr.push(subArr);
        }
        this.setState({grandArr: arr})
    },

    initBoard() {

        let {numCols, numRows, grandArr} = this.state;
        const loading = grandArr.length === 0;
        if (!loading) {

        // Create HTML table
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
            
        return tableBody;

        }
    },

    hello(key) {
        console.log(key)
        let elemToChange = document.getElementById(key);
        $(elemToChange).attr('class', 'populated')
        // TODO: Change array to account for a click
    },

    render() {
        return (
            <div>
                <h5>Generations: {this.state.generationsCount}</h5>
                <hr/>
                <button onClick={this.clearBoard}>Start</button>
                <button>Pause</button>
                <button>Clear</button>
                <hr/>
                <table border="1" cellPadding="0" cellSpacing="0">
                    <tbody>
                        {this.initBoard()}
                    </tbody>
                </table>
            </div>
        )
    }
})

ReactDOM.render(<Main />, document.getElementById('root'))