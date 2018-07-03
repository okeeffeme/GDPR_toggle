import React from 'react';

class StatelessCheckbox extends React.Component {

  render(){
    const {checked,label,onClick} = this.props;

    return (
      <div onClick={onClick}>
        <input type='checkbox' checked={checked} />
        <label>{label}</label>
      </div>
    );
  }
}

class StatefulCheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checked:[]};
    this.renderCheckbox = this.renderCheckbox.bind(this);
  }
  toggleCheckbox(label) {
    const {checked} = this.state;
    let newChecked;
    const isChecked = checked.includes(label);

    if(isChecked) {
      newChecked = checked.filter((l) => l !== label);
    } else {
      newChecked = [...checked];
      newChecked.push(label);
    }
    this.setState({checked: newChecked});
    console.log('toggleCheckbox ' + label);
  }

  renderCheckbox(label) {
    const {checked} = this.state;
    const isChecked = checked.includes(label);
    const onClick = () => this.toggleCheckbox(label);

    return (
      <StatelessCheckbox
        label={label}
        checked={isChecked}
        onClick={onClick}
      />
    );
  }

  render() {
    const {labels} = this.props;
    const {renderCheckbox} = this;
    const checkboxes = labels.map(renderCheckbox);

    return (
      <div>
        {checkboxes}
      </div>
    );
  }
}

class Page extends React.Component {
  render() {
    return (
      <div>
        <StatefulCheckboxGroup
          labels={['a', 'b', 'c' ]}
        />
      </div>
    );
  }
}

export default Page;
