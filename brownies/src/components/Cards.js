import React, { useEffect, useState, useMemo, useRef } from "react";
import TinderCard from 'react-tinder-card'

function Cards(props) {
    const [db, setDb] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [lastDirection, setLastDirection] = useState()
    const currentIndexRef = useRef(currentIndex)

    useEffect(() => {
      setDb(props.results);
      setCurrentIndex(props.results.length - 1)
    },[props.results]);
    
    const childRefs = useMemo(
      () =>
        Array(db.length)
          .fill(0)
          .map((i) => React.createRef()),
      [db]
    )
  
    const updateCurrentIndex = (val) => {
      setCurrentIndex(val)
      currentIndexRef.current = val
    }
  
    const canGoBack = currentIndex < db.length - 1
  
    const canSwipe = currentIndex >= 0
  
    const swiped = (direction, nameToDelete, index) => {
      setLastDirection(direction)
      updateCurrentIndex(index - 1)
    }
  
    const outOfFrame = (name, idx) => {
      console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
      currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    }
  
    const swipe = async (dir) => {
        if (canSwipe && currentIndex < db.length) {
            await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }
  
    const goBack = async () => {
      if (!canGoBack) return
      const newIndex = currentIndex + 1
      updateCurrentIndex(newIndex)
      await childRefs[newIndex].current.restoreCard()
    }
  
    return (
      <div>
        <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
        <h1>Brownies Are Cookies</h1>
        <div className='cardContainer'>
          {db && db.map((recipe, index) => (
            <TinderCard
              ref={childRefs[index]}
              className='swipe'
              key={recipe.name}
              onSwipe={(dir) => swiped(dir, recipe.name, index)}
              onCardLeftScreen={() => outOfFrame(recipe.name, index)} 
            >
              <div style={{ backgroundImage: 'url(' + recipe.image + ')' }} className='card' >
                <h3>{recipe.name}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
        <div className='buttons'>
          <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
          <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
          <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
        </div>
        {lastDirection ? (
            <h2 key={lastDirection} className='infoText'>
              You swiped {lastDirection}
            </h2>
          ) : (
            <h2 className='infoText'>
              Swipe a card or press a button to get Restore Card button visible!
            </h2>
          )}
      </div>
    )
}

export default Cards;