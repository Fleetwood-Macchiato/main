const axios = require("axios");
class Api {
  constructor(baseURL) { 
    this.baseURL = baseURL
    this.api = axios.create(
      {
        baseURL: process.env.API_URL || this.baseURL
      }
    )
  }
  getAll = () => this.api.get("/")
  getOne = (id)=> this.api.get(`/${id}`)
  createOne = (newEntityValues)=>this.api.post("/", newEntityValues)
  deleteOne = (id)=> this.api.delete(`/${id}`)
  updateOne = (id)=> this.api.put(`/${id}`)
}

module.exports = new Api;


