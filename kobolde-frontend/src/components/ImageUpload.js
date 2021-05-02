import React, { Component } from 'react';
import superagent from 'superagent';


class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      position: this.props.position,
      apiUrl: this.props.apiUrl,
      preload: false,

    }
    this.onFileSelected = this.onFileSelected.bind(this)
    this.onPositionChange = this.onPositionChange.bind(this)
    this.onFileUploadHandler = this.onFileUploadHandler.bind(this);
  }

  onPositionChange(ev) {

  }

  onFileSelected(ev) {
    this.setState({
      submit: true,
    })
  }

  onFileUploadHandler() {
    this.setState({
      preload: true,
    })

    let files = document.getElementById('file_to_upload').files;
    let self = this;
    superagent.post(this.state.apiUrl)
      .set('accept', 'json')
      .attach('files', files[0])
      .field('position', this.state.position)
      .end(function (err, res) {
        console.log(res);
        self.setState({
          preload: false,
        })
       // self.props.onImageAdded(JSON.parse(res.text).url, JSON.parse(res.text).id);
        self.props.onImageAdded("https://html5box.com/html5lightbox/images/skynight.jpg",1);

      });

  }

  render() {

    return (
      <div className="react-modal-container">
        <div className="react-modal-popup">
          <div className="react-modal-header">
            Subir Imagen: {this.state.position}
            <hr />
          </div>
          <div className="react-modal-content">
            <form id="image-upload" encType="multipart/form-data">
              <input type="hidden" name="position" defaultValue={this.props.position}
                onChange={this.onPositionChange} />
              <input type="file" id="file_to_upload" name="file_to_upload"
                onChange={this.onFileSelected} />
            </form>
            {this.state.preload ?
              <div className="react-modal-preload"><img src="http://1203media.com/images/preload.gif"
                alt="" /></div> : ''}


            <br /><br /><br />
          </div>
          <div className="react-modal-footer">
            <hr />
            <div className="react-modal-button react-button" onClick={this.props.toggleModal}>Cerrar</div>
            {this.state.submit ?
              <div id="react-modal-submit" className="react-button" onClick={this.onFileUploadHandler}>
                Subir Imagen</div> : ""}
          </div>
        </div>
      </div>
    )
  }
}

class Launcher extends Component {
  render() {
    return (<div className="react-button" onClick={this.props.toggleModal}>Subir {this.props.position}</div>)
  }
}


class ImagePreview extends Component {
  render() {
    const previewStyle = {
      maxWidth: this.props.maxWidth + 'px',
    }
    return (
      <div style={previewStyle} className="react-image-upload-preview">
        <div className="react-image-upload-preview-toolbar">
          <span className="close" onClick={this.props.deleteImage}>X</span>
        </div>
        <div className="react-image-upload-preview-image">

          <img src={this.props.imageUrl} alt="" />
        </div>
      </div>

    );
  }
}


class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      launcher: true,
      position: this.props.position,
      imageId: (this.props.imageId && this.props.imageId !== '' ? this.props.imageId : null),
      imageUrl: (this.props.imageUrl && this.props.imageUrl !== '' ? this.props.imageUrl : null),
      maxWidth: (this.props.maxWidth && this.props.maxWidth !== '' ? this.props.maxWidth : 300),

    }
    this.toggleModal = this.toggleModal.bind(this);
    this.onImageUrlChangeHandler = this.onImageUrlChangeHandler.bind(this);
    this.onImageAdded = this.onImageAdded.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  onImageAdded(imageUrl, imageId) {
    this.setState({
      imageId: imageId,
      imageUrl: imageUrl,
      modal: !this.state.modal
    })
  }

  onImageUrlChangeHandler(ev) {
    console.log('added');
  }

  deleteImage() {
    console.log('delete');
    this.setState({
      imageUrl: '',
    })
  }

  render() {
    return (
      <div className="ImageUpload">

        <label htmlFor="">Imagen: {this.state.position}</label><br />
        <input type="hidden" name={this.state.position + '_image_id'} value={this.state.imageId}
          onChange={this.onImageUrlChangeHandler} />

        {this.state.imageUrl !== '' && this.state.imageUrl ?
          <ImagePreview maxWidth={this.state.maxWidth} deleteImage={this.deleteImage}
            imageUrl={this.state.imageUrl} /> : ''}
        {this.state.imageUrl === '' || this.state.imageUrl === null ?
          <Launcher toggleModal={this.toggleModal} position={this.state.position} /> : ''}
        {this.state.modal ?
          <Modal onImageAdded={this.onImageAdded} apiUrl={this.props.apiUrl} position={this.state.position}
            toggleModal={this.toggleModal} /> : ""}
        <br />
      </div>
    );
  }
}


export default ImageUpload
