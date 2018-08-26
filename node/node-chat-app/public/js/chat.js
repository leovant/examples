var socket = io();

function scrollToBottom() {
  // Selectors
  let messages_cnt = jQuery('#messages-list');
  let new_message = messages_cnt.children('li:last-child');
  // Heights;
  let client_height = messages_cnt.prop('clientHeight');
  let scroll_top = messages_cnt.prop('scrollTop');
  let scroll_height = messages_cnt.prop('scrollHeight');
  let new_message_height = new_message.innerHeight();
  let last_message_height = new_message.prev().innerHeight();

  if (
    client_height + scroll_top + new_message_height + last_message_height >=
    scroll_height
  ) {
    messages_cnt.scrollTop(scroll_height);
  }
}

socket.on('connect', function() {
  let params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(error) {
    if (error) {
      alert(error);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('updateUsersList', function(users) {
  let ol = jQuery('<ol></ol>');

  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on('newMessage', function(message) {
  let formatted_time = moment(message.created_at).format('h:mm a');
  let template = jQuery('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    created_at: formatted_time
  });

  jQuery('#messages-list').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  let formatted_time = moment(message.created_at).format('h:mm a');
  let template = jQuery('#location-message-template').html();
  let html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    created_at: formatted_time
  });

  jQuery('#messages-list').append(html);
  scrollToBottom();
});

jQuery('#message-form').on('submit', function(e) {
  let message_fld = jQuery('[name=message]');

  e.preventDefault();

  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: message_fld.val()
    },
    function() {
      message_fld.val('');
    }
  );
});

var location_btn = jQuery('#send-location');

location_btn.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  location_btn.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(
    function(position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });

      location_btn.removeAttr('disabled').text('Send location');
    },
    function() {
      location_btn.removeAttr('disabled').text('Send location');
      alert('Unable to fetch location.');
    }
  );
});
