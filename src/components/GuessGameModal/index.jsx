import React from 'react'
import styles from './guessgamemodal.module.css'
import Cost from '../Cost'

import questionmark from '../../assets/svg/question-mark.svg'
import brand from '../../assets/svg/brand.svg'
import diary from '../../assets/svg/diary.svg'
import eviction from '../../assets/svg/eviction.svg'
import hoh from '../../assets/svg/hoh.svg'
import nomination from '../../assets/svg/nomination.svg'
import party from '../../assets/svg/party.svg'

const GuessGameModal = (props) => {
    const {showGuessGameCategoryPopUp} = props
    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
            <img src={questionmark} alt="questionmark" />
            <div className={styles.guessname}>Guess Game</div>
            <div className={styles.guessdesc}>Select a category to start your game</div>
            <Cost />
            <p>scroll down to see all categories</p>
            </div>
            <div className={styles.categorywrapper}>
                <div className={styles.card} onClick={showGuessGameCategoryPopUp}>
                    <img src={diary} alt="questionmark" />
                    <div className={styles.description}>
                        <div className={styles.h3}>diary session</div>
                        <div>Event starts in</div>
                        <div className={styles.time}>
                            <span className={styles.counter}>0</span><span>d</span>:{' '}
                            <span className={styles.counter}>0</span><span>h</span>:{' '}
                            <span className={styles.counter}>20</span><span>min</span>
                        </div>
                    </div>
                </div>
                <div className={styles.card} onClick={showGuessGameCategoryPopUp}>
                    <img src={hoh} alt="questionmark" />
                    <div className={styles.description}>
                        <div className={styles.h3}>h.o.h game</div>
                        <div>Event starts in</div>
                        <div className={styles.time}>
                            <span className={styles.counter}>0</span><span>d</span>:{' '}
                            <span className={styles.counter}>0</span><span>h</span>:{' '}
                            <span className={styles.counter}>20</span><span>min</span>
                        </div>
                    </div>
                </div>
                <div className={styles.card} onClick={showGuessGameCategoryPopUp}>
                    <img src={brand} alt="questionmark" />
                    <div className={styles.description}>
                        <div className={styles.h3}>brands games</div>
                        <div>Event starts in</div>
                        <div className={styles.time}>
                            <span className={styles.counter}>0</span><span>d</span>:{' '}
                            <span className={styles.counter}>0</span><span>h</span>:{' '}
                            <span className={styles.counter}>20</span><span>min</span>
                        </div>
                    </div>
                </div>
                <div className={styles.card} onClick={showGuessGameCategoryPopUp}>
                    <img src={party} alt="questionmark" />
                    <div className={styles.description}>
                        <div className={styles.h3}>saturday party</div>
                        <div>Event starts in</div>
                        <div className={styles.time}>
                            <span className={styles.counter}>0</span><span>d</span>:{' '}
                            <span className={styles.counter}>0</span><span>h</span>:{' '}
                            <span className={styles.counter}>20</span><span>min</span>
                        </div>
                    </div>
                </div>
                <div className={styles.card} onClick={showGuessGameCategoryPopUp}>
                    <img src={eviction} alt="questionmark" />
                    <div className={styles.description}>
                        <div className={styles.h3}>eviction night</div>
                        <div>Event starts in</div>
                        <div className={styles.time}>
                            <span className={styles.counter}>0</span><span>d</span>:{' '}
                            <span className={styles.counter}>0</span><span>h</span>:{' '}
                            <span className={styles.counter}>20</span><span>min</span>
                        </div>
                    </div>
                </div>
                <div className={styles.card} onClick={showGuessGameCategoryPopUp}>
                    <img src={nomination} alt="questionmark" />
                    <div className={styles.description}>
                        <div className={styles.h3}>nomination show</div> 
                        <div>Event starts in</div>
                        <div className={styles.time}>
                            <span className={styles.counter}>0</span><span>d</span>:{' '}
                            <span className={styles.counter}>0</span><span>h</span>:{' '}
                            <span className={styles.counter}>20</span><span>min</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GuessGameModal
