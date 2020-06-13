import React from 'react'

export default function HomeContent() {
  return (
    <section className="container">
        <div className="columns features">
            <div className="column is-4">
                <div className="card is-shady">
                    <div className="card-content">
                        <div className="content">
                            <h4>Step 1.</h4>
                            <p>Register/Log in to TagStore.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
                <div className="card is-shady">
                    <div className="card-content">
                        <div className="content">
                            <h4>Step 2.</h4>
                            <p>Upload your images.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
                <div className="card is-shady">
                     <div className="card-content">
                        <div className="content">
                            <h4>Step 3.</h4>
                            <p>Retrieve images based on tags.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
