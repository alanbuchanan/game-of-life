function initBlank(numRows, numCols) {
    
    let arr = [];

    for(let i = 0; i < numRows; i++){
        let subArr = [];
        for(let j = 0; j < numCols; j++){
            subArr.push('empty')
            let key = i + '_' + j
        }
        arr.push(subArr);
    }
    return arr;
}

const Main = React.createClass({

    getInitialState() {
        return {
            numRows: 55,
            numCols: 47,
            arrInit: function(){
                this.grandArr = initBlank(this.numRows, this.numCols)
                return this;
            },
            intervalId: 0,
            interval: 100,
            isPaused: false,
            generationsCount: 0
        }.arrInit()    
    },

    componentDidMount() {
        this.setAllEmpty();
        this.setRandomisedArray();
        this.resumeBoard()
    },

    resumeBoard() {
        let intervalId = setInterval(this.nextGen, this.state.interval);
        this.setState({intervalID: intervalId});
    },

    setAllEmpty() {
        let {numCols, numRows} = this.state;
        let arr = [];

        for(let i = 0; i < numRows; i++){
            let subArr = [];
            for(let j = 0; j < numCols; j++){
                subArr.push('empty')
            }
            arr.push(subArr);
        }
        this.setState({grandArr: arr})        
    },

    setGlider() {
        let arr = this.state.grandArr.slice()
        arr[7][11] = 'populated';
        arr[8][11] = 'populated';
        arr[8][13] = 'populated';
        arr[9][11] = 'populated';
        arr[9][12] = 'populated';
        this.setState({grandArr: arr})
    
    },

    clearBoard() {
        clearInterval(this.state.intervalId);
        this.setState({generationsCount: 0})
        this.setState({intervalId: clearInterval(this.state.intervalId)})
        this.setAllEmpty();
        this.resumeBoard()
        this.setState({isPaused: true})
    },

    nextGen() {

        if(!this.state.isPaused) {

        let {numCols, numRows, grandArr, arrCopy, generationsCount} = this.state;
        this.setState({generationsCount: ++generationsCount})

        // Make a copy
        let newArr = []
        for(let i = 0; i < grandArr.length; i++){
            let subArr = []
            for(let j = 0; j < numCols; j ++){
                subArr.push(grandArr[i][j])
            }
            newArr.push(subArr);
        }
        
        let aboveRow, middleRow, belowRow, leftCol, middleCol, rightCol = 0;
        let currentCell, topLeftCell, topCell, topRightCell, rightCell, bottomRightCell, bottomCell, bottomLeftCell, leftCell = '';

        let isPopulatedOrDying = cell => cell === 'populated' || cell === 'dying';

        let evaluateNeighbours = () => {
            let count = 0;
            if (isPopulatedOrDying(topLeftCell)) ++count;
            if (isPopulatedOrDying(topCell)) ++count;
            if (isPopulatedOrDying(topRightCell)) ++count;
            if (isPopulatedOrDying(rightCell)) ++count;
            if (isPopulatedOrDying(bottomRightCell)) ++count;
            if (isPopulatedOrDying(bottomCell)) ++count;
            if (isPopulatedOrDying(bottomLeftCell)) ++count;
            if (isPopulatedOrDying(leftCell)) ++count;
            return count;
        }

        // Get rows
        for(let i = 0; i < grandArr.length; i++){
            middleRow = i;
            if(i === 0) { aboveRow = numRows - 1; } else { aboveRow = i - 1; }
            if(i === numRows - 1) { belowRow = 0; } else { belowRow = i + 1; }

            // Get cols
            for(let j = 0; j < numCols; j++){
                middleCol = j;
                if(j === 0) { leftCol = numCols - 1; } else { leftCol = j - 1; }
                if(j === numCols - 1) { rightCol = 0; } else { rightCol = j + 1; }

                currentCell = grandArr[middleRow][middleCol];
                topLeftCell = grandArr[aboveRow][leftCol];
                topCell = grandArr[aboveRow][middleCol];
                topRightCell = grandArr[aboveRow][rightCol]
                rightCell = grandArr[middleRow][rightCol]
                bottomRightCell = grandArr[belowRow][rightCol]
                bottomCell = grandArr[belowRow][middleCol]
                bottomLeftCell = grandArr[belowRow][leftCol]
                leftCell = grandArr[middleRow][leftCol]
                
                let neighbsCount = 0

                neighbsCount = evaluateNeighbours();

                if(currentCell === 'populated'){
                    if(neighbsCount !== 2 && neighbsCount !== 3){
                        // console.info(`marking newArr[${i}][${j}] (${newArr[i][j]}) for dying`)
                        newArr[i][j] = 'dying'
                    }
                }
                
                // console.log(`NEIGHBOURS: ${neighbsCount}`)
            }
        };

        for(let i = 0; i < grandArr.length; i++){

            middleRow = i;
            if(i === 0) { aboveRow = numRows - 1; } else { aboveRow = i - 1; }
            if(i === numRows - 1) { belowRow = 0; } else { belowRow = i + 1; }

            for(let j = 0; j < numCols; j++){

                middleCol = j;
                if(j === 0) { leftCol = numCols - 1; } else { leftCol = j - 1; }
                if(j === numCols - 1) { rightCol = 0; } else { rightCol = j + 1; }

                currentCell = grandArr[middleRow][middleCol];
                topLeftCell = grandArr[aboveRow][leftCol];
                topCell = grandArr[aboveRow][middleCol];
                topRightCell = grandArr[aboveRow][rightCol]
                rightCell = grandArr[middleRow][rightCol]
                bottomRightCell = grandArr[belowRow][rightCol]
                bottomCell = grandArr[belowRow][middleCol]
                bottomLeftCell = grandArr[belowRow][leftCol]
                leftCell = grandArr[middleRow][leftCol]

                let neighbsCount = 0

                neighbsCount = evaluateNeighbours();

                if(currentCell === 'empty') {
                    if(neighbsCount === 3){
                        // console.log(`Turning ${currentCell} cell newArr[${i}][${j}] populated`)
                        newArr[i][j] = 'populated'
                    }
                }

                if(newArr[i][j] === 'dying'){
                    // console.log(`Killing ${newArr[i][j]} cell newArr[${i}][${j}]`)
                    newArr[i][j] = 'empty';
                }

            }
        }

        this.setState({grandArr: newArr})

    } else {
                clearInterval(this.state.intervalId);
    }

    },

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
                            onClick={this.handleCellClick.bind(null, key)}
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

    handleCellClick(key) {
        let keySplit = key.split('_')
        console.log(keySplit)
        let elemToChange = document.getElementById(key);
        $(elemToChange).attr('class', 'populated');
        let newArr = this.state.grandArr.slice();

        if(newArr[keySplit[0]][keySplit[1]] === 'empty'){
            newArr[keySplit[0]][keySplit[1]] = 'populated'
        } else {
            newArr[keySplit[0]][keySplit[1]] = 'empty'
        }
        this.setState({grandArr: newArr})
    },

    pause(e) {
        e.preventDefault();
        clearInterval(this.state.intervalId)
        this.setState({isPaused: true})

    },

    start(e) {
        e.preventDefault();
        this.setState({isPaused: false})
        this.resumeBoard()
    },

    render() {
        return (
            <div>
                <h1>Game of Life Sim</h1>
                <div className="cols-xs-12">
                    {this.state.isPaused
                        ? <button className="col-xs-4" onClick={this.start}>Start</button>
                        : <button className="col-xs-4" onClick={this.pause}>Pause</button>
                    }
                    <button className="col-xs-4" onClick={this.clearBoard}>Clear</button>
                    <button className="col-xs-4" onClick={this.setGlider}>Insert glider</button>
                </div>

                <table border="1" cellPadding="0" cellSpacing="0">
                    <tbody>
                        {this.initBoard()}
                    </tbody>
                </table>
                <h5>Generations: {this.state.generationsCount}</h5>
            </div>
        )
    }
})

ReactDOM.render(<Main />, document.getElementById('root'))