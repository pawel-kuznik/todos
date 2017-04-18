# todos-cli

This small node application is a todo list that can be accessed from the cli.
It uses command pattern for calling actions. It stores data locally, so there
is no need to connect to a database.

# Example

When you want to create your 1st todo you want to call following

```
$ todos create 'My TODO'
```

It will result of creation of a new todo on a list. You can see that todo by calling

```
$ todos list
id       state  title  
bb19bea7 active MyTODO
```

When you finished a todo you can call following to mark it as done.

```
$ todos check bb19bea7
```

And if you don't need done todos to stick around you can clear them with following.

```
$ todos clear
```
