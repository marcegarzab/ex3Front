var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

$('#btnHide').on('click', function(event){
  let $todoSection = $('#todo-list')
  $todoSection.toggle('hidden')
})

var todos = document.querySelectorAll("input[type=checkbox]");

function loadTodos() {
  $.ajax({
    // url: 'http://localhost:3000/todos',
    url: 'https://finalexam3.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        let newHTML = `<li><input type="checkbox" name="todo" value="1"><span>${data[i].description}</span></li>`

        $('#todo-list').append(newHTML)
        
        console.log(data[i].description)
        // algo asi:
        // addTodo(data[i]._id, data[i].description, data[i].completed)
        // no tienen que usar la funcion de addTodo, es un ejemplo
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      // url: 'http://localhost:3000/todos',
      url: 'https://finalexam3.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        // agregar código aqui para poner los datos del todolist en el el html
        let newHTML = `<li><input type="checkbox" name="todo" value="1"><span>${data.description}</span></li>`

        $('#todo-list').append(newHTML)
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})

$('#logoutButton').on('click', function(){
  $.ajax({
    // url: 'http://localhost:3000/users',
    url: 'https://finalexam3.herokuapp.com/logout',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: token,
    success: function(data){
      alert("Logout exitoso");
      window.location = './index.html'
    },
    error: function(error_msg) {
      alert("Couldn't do it correctly :(");
    }
  });
});

// MY ATTEMPT FOR DELETE...  

// function deleteTodos() {
//   $.ajax({
//     // url: 'http://localhost:3000/todos',
//     url: 'https://finalexam3.herokuapp.com/todos/' + token,
//     headers: {
//         'Content-Type':'application/json',
//         'Authorization': 'Bearer ' + token
//     },
//     method: 'DELETE',
//     dataType: 'json',
//     success: function(data){

//     },
//     error: function(error_msg) {
//       alert((error_msg['responseText']));
//     }
//   });
// }

// function addTodo(id, todoText, completed) {
//   $('#todo-list').append('todoText')
// }