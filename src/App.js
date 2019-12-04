import React from 'react';
import './App.css';

function BoxMarquee(props) { 
  return <>
    <marquee direction={props.vertDirection} behavior="alternate" scrollamount={props.vertSpeed} style={{height: "100%", width: "100%"}}>
      <marquee direction={props.horizDirection} behavior="alternate" scrollamount={props.horizSpeed} style={{width: "100%"}}>
        {props.children}
      </marquee>
    </marquee>
  </>
}

function Spinning(props) {
  return <div style={{width: "100%", height: "100%", animation: `${props.speed}s linear 0s infinite ${props.reverse ? "normal" : "reverse"} both running spin`}}>
    {props.children}
  </div>
} 

class Flashing extends React.Component {
  constructor(props) {
    super(...arguments)
    this.state = {
      colors: new Array(React.Children.count(props.children))
    }
    this.randomColors(this.state.colors)
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(state => {
        this.randomColors(state.colors)
        return state
      })
    }, this.props.rate || 1000)
  }

  randomColors(colors) {
    for (let i = 0; i < colors.length; i++) {
      colors[i] = `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`
    }
  }

  render() {
    return React.Children.map(this.props.children, (child, i) => {
      return <div style={{[this.props.styleProp]: this.state.colors[i]}}>
        {child}
      </div>
    })
  }
}

function App(props) {
  let a = []
  for(let i=0; i<props.num; i++){
    a.push(
      <div style={{position: "fixed", width: "100vw", height:"100vh", pointerEvents: "none"}}>
        <BoxMarquee 
          vertSpeed={getRandomInt(1, 50)}
          horizSpeed={getRandomInt(1, 50)} 
          vertDirection={getRandomVerticalDirection()}
          horizDirection={getRandomHorizontalDirection()}
        >
          <div style={{width: 30, height: 30, pointerEvents: "auto"}}>
            <a href={`https://www.wikipedia.org/wiki/${i}_(number)`} style={{textDecoration: "none", color: "inherit"}}>
              <Spinning reverse={getRandomInt(0, 1)} speed={getRandomInt(500, 5000)/1000}>
                <div style={{
                  height: "100%",
                  display:"flex",
                  flexFlow: "row nowrap",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  {i}
                </div>
              </Spinning>
            </a>
          </div>
        </BoxMarquee>
      </div>
    )
  }

  return <Flashing rate={500} styleProp="backgroundColor">
    <div style={{width: "100vw", height: "100vh"}}>
      <Flashing rate={400} styleProp="color">
        {a}
      </Flashing>
    </div>
  </Flashing>
}

function getRandomVerticalDirection() {
  switch(getRandomInt(0,1)) {
    case 0: return "up"
    case 1: return "down"
  }
}

function getRandomHorizontalDirection() {
  switch(getRandomInt(0,1)) {
    case 0: return "left"
    case 1: return "right"
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is exclusive and the minimum is inclusive
}

function MyMarquee(i){
  return <div>
    <marquee scrollamount={i} style={{
      color: `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`
    }}>
      <div style={{width:"120px"}}>{i}</div>
    </marquee>
  </div>
}

export default App;
