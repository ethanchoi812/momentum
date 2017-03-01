import React from 'react';

export default class TodoItemTitle extends React.Component {
  render() {
    const isEditing = this.props.isEditing;
    const title = this.props.title;
    const onChangeTitle = this.props.onChangeTitle;
    const onToggleEdit = this.props.onToggleEdit;

    return (
      <div className="todo-item-title">
        { !isEditing && <span onClick={onToggleEdit}>{title}</span> }

        { isEditing && <input value={title}
          onChange={onChangeTitle}
          onBlur={onToggleEdit}
          onKeyPress={onToggleEdit}
          autoFocus={true} /> }
      </div>
    );
  }
};
