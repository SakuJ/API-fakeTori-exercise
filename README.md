# API-exercise

implement a web application API which primary function is to serve as a platform for selling and buying used items.

Api endpoints:

# /user

POST -Create a new user. These datas must be provided in the body.

Body requirements:
  -username - string
  -email - string
  -phoneNumber - number
  -password - string
  -name - string
  -address -object

GET -Check all users

# /login

POST -Logging an user in. Allows creating, editing and deleting items.

Body requirements:
    -username -string
    -password -string

# /logged

GET -Check if you are logged in

# /logout

POST -Logging the user out.

# /item

POST -Create a new item. Login is required.

Body requirements:
    -title -string
    -description -string
    -category -boolean
    -images -image
    -location -object
    -deliverytype -object
    -contactinfo -object

GET -Check all items

# /item/category or location or date

GET -Search items created by all users. Can use queries category, location or time.

# /user/:uid

PUT -Modifying an existing user. Must be logged in.

# /item/:itemId

PUT -Modifying an existing item. Must be logged in.

DELETE -Deleting user. Must be logged in.