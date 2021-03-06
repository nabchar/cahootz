import React from 'react';
import { connect } from 'react-redux';
import { deleteMessage, updateMessage } from '../../actions/message_actions';


const mapStateToProps = ({session}) => {
  return {
    currentUser: session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delete: (id) => dispatch(deleteMessage(id)),
    update: (message) => dispatch(updateMessage(message))
  };
};

class MessageIndexItem extends React.Component {
  constructor(props) {
    super(props);


    this.state = { content: props.message.content,
                   showEdit: false,
                   showActions: false,
                   disabled: false,
                   originalContent: props.message.content };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDelete(e) {
    let {message} = this.props;
    this.props.delete(message.id);
  }

  handleUpdate() {
    if (this.state.showEdit) {
      this.setState({content: this.state.originalContent});
      this.setState({showEdit: false});
    } else {
    this.setState({showEdit: true});
    }
  }

  updateInput(e) {
    let value = e.currentTarget.value;
    this.setState({content: value},
      () => {
        if (this.state.content === '') {
          this.setState({disabled: true});
        } else {
          this.setState({disabled: false});
        }
      }
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    let updatedMessage = { id: this.props.message.id,
                           content: this.state.content};
    this.props.update(updatedMessage)
      .then(() => this.setState({showEdit: false}));
  }

  render() {
    let {message} = this.props;

    let timestamp = new Date(message.created_at);
    let currentTime = new Date;
    if (timestamp.getDay() < currentTime.getDay()) {
      timestamp = timestamp.toLocaleString();
    } else {
      timestamp = timestamp.toLocaleTimeString();
    }

    let showForm = this.state.showEdit ? 'show' : 'hide';
    let showContent = (showForm === 'show') ? 'hide' : 'show';

    let showActions;
    if (this.props.currentUser) {
      showActions = (message.author.id ===
        this.props.currentUser.id) ? 'show' : 'hide';
    }

    return (

    <div className='message-index-item'>
      <div className='avatar-outer'>
        <img src={message.author.avatar_url} className='avatar' />
      </div>
      <div className='message-content'>
        <div>
          <span className={"m-author " +  showContent}>
            {message.author.username}
          </span>
          <span className={'m-time ' + showContent}>
            {timestamp}
          </span>
          <p className={'m-content ' + showContent}>
            {message.content}
          </p>
          <form className={'m-edit ' + showForm}
                onSubmit={this.handleSubmit}>
            <input type="text"
                   value={this.state.content}
                   onChange={this.updateInput}/>
            <button type='button' onClick={this.handleUpdate}>Cancel</button>
            <input type='submit'
                   disabled={this.state.disabled}
                   value="Edit"/>
          </form>
        </div>
      </div>
      <div className={"m-actions " + showActions}>
        <i onClick={this.handleUpdate}
           className="fa fa-pencil-square-o" aria-hidden="true"></i>
        <i onClick={this.handleDelete}
           className="fa fa-trash-o" aria-hidden="true"></i>
      </div>
    </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(MessageIndexItem);
