import { Router } from 'express'
const router = Router()
import { movieSearch, animeLibrary, animeSearch, movieLibrary, animeInfo, movieInfo, localSearch, allSearch, sweep } from '../../controllers/libraryController'

export default router

//search
//.get('/search', movieSearchLibrary)
.get('/anime/:search', sweep, animeSearch)
.get('/movie/:search', sweep, movieSearch)
.get('/local/:search', sweep, localSearch)
.get('/:search', sweep, allSearch)
.get('/animeinfo/:search', animeInfo)
.get('/movieinfo/:search', movieInfo)

//return top results
.get('/topmovies', movieLibrary)
.get('/topanime/:number', animeLibrary)