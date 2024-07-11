import React, { Component } from 'react'

export default class Lyricsfinder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            artist: "",
            song: "",
            lyrics: ""
        }

    }

    handlesearch = async () => {

        if (this.state.artist === "" || this.state.song === "") {
            alert("please check the value")
        }

        else {
            const response = await fetch(`https://api.lyrics.ovh/v1/${this.state.artist}/${this.state.song}`)
            const data = await response.json();
            const lyrics = data.lyrics;
            const error = data.error
            if (!lyrics) {
                this.setState({ lyrics: error })
            }
            else {
                this.setState({ lyrics: lyrics })
            }
        }


    }

    render() {
        return (
            <>
                <div className="container d-flex flex-column justify-content-center align-items-center">
                    <h1 className='my-4'>Ly<i className="fa-solid fa-music"></i>ics Finder</h1>
                    <div className="form" >
                        <div className="form-floating mb-3" style={{ minWidth: "600px" }}>
                            <input type="text" className="form-control" id="floatingInput" placeholder="Artist name" onChange={(e) => this.setState({ artist: e.target.value })} />
                            <label htmlFor="floatingInput">Artist</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Song name" onChange={(e) => this.setState({ song: e.target.value })} />
                            <label htmlFor="floatingInput">Song</label>
                        </div>
                    </div>
                    <button type="button" className="btn btn-secondary" onClick={this.handlesearch}>Search </button>
                    {this.state.lyrics === "" ? "" : <div className="lyrics my-5 p-5">
                        <pre> {this.state.lyrics} </pre>
                    </div>}
                </div>
            </>
        )
    }
}
