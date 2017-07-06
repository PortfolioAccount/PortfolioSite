import React from 'react';


class Phone extends React.Component{

    constructor(props){
        super(props);
        this.state = {data: props.phone};
        this.onClick = this.onClick.bind(this);
    }
    onClick(e){
        this.props.onRemove(this.state.data);
    }
    render(){
        return <div className="box">
                <p><b>{this.state.data.Name}:  </b>
                 {this.state.data.Date}
                 <button className="delete-note" onClick={this.onClick}>X</button></p>
                <p> {this.state.data.Review}</p>
                
        </div>;
    }
}

class PhoneForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {name: "", review: ""};

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onReviewChange = this.onReviewChange.bind(this);
    }
    onNameChange(e) {
        this.setState({name: e.target.value});
    }
    onReviewChange(e) {
        this.setState({review: e.target.value});
    }
    onSubmit(e) {
        e.preventDefault();
        var phoneName = this.state.name.trim();
        var phoneReview = this.state.review.trim();
        if (!phoneName || !phoneReview) {
            return;
        }
        this.props.onPhoneSubmit({ name: phoneName, review: phoneReview});
        this.setState({name: "",review:""});
    }
    render() {
        return (
          <form onSubmit={this.onSubmit}>
              <p>
                  <textarea className="text-input" type="text"
                         placeholder="Введите текст..."
                         value={this.state.review}
                         onChange={this.onReviewChange} />
              </p>
            <p>
                <input className="name-input" type="text"
                       placeholder="Введите ваше имя..."
                       value={this.state.name}
                       onChange={this.onNameChange} />
                       <input className="button-input" type="submit" value="Отправить" />
            </p>
            
          </form>
        );
              }
}

export default class PhonesList extends React.Component{

    constructor(props){
        super(props);
        this.state = { phones: [] };

        this.onAddPhone = this.onAddPhone.bind(this);
        this.onRemovePhone = this.onRemovePhone.bind(this);
    }
    // загрузка данных
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/Reviews/GetReviews", true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ phones: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }
    // добавление объекта
    onAddPhone(phone) {
        if (phone) {

            var data = new FormData();
            var day = new Date();
            var dayFormat = day.toLocaleString()
            var newDayFormat = dayFormat.replace(/[A-Z]|[,]/g, "");
            data.append("name", phone.name);
            data.append("review", phone.review);
            data.append("date", newDayFormat);
            var xhr = new XMLHttpRequest();
            xhr.open("post", "/Reviews/AddPhone", true);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }
    // удаление объекта
    onRemovePhone(phone) {

        if (phone) {
            var data = new FormData();
            data.append("id", phone.Id);

            var xhr = new XMLHttpRequest();
            xhr.open("delete", "/Reviews/DeletePhone", true);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }

    

    render(){

        var remove = this.onRemovePhone;
        return <div>
                <PhoneForm onPhoneSubmit={this.onAddPhone} />
                <hr />
                
                <div className="box-out" >
                    {
                        this.state.phones.map(function(phone){

                            return <Phone key={phone.Id} phone={phone} onRemove={remove} />
                            })
                    }
                </div>
        </div>;
    }
}

