# gitlab-group

## Description
This small utility allow you to manage a group from a gitlab instance for a specific user

## Installation
```
npm install gitlab-group -g
```

## Usage
```
gitlab-group parameters [--delete] name

parameters :
--prefix http://your.gitlab.instance.com
--token  YOUT_GITLAB_INSTANCE_PRIVATE_TOKEN
```

## Examples

### Fetch (or create if doesn't exist) a gitlab group
```
gitlab-group --prefix "https://gitlab.com" --token "43hTY34c3428f47FRD890d" my_new_group
```

Il will return seomthing like
```
{
   "visibility" : "public",
   "lfs_enabled" : true,
   "web_url" : "http://gitlab.com/my_username/groups/my_new_group",
   "parent_id" : null,
   "name" : "my_new_group",
   "id" : 6,
   "path" : "my_new_group",
   "request_access_enabled" : false,
   "full_path" : "my_new_group",
   "description" : "",
   "avatar_url" : null,
   "full_name" : "my_new_group"
}
```


### Fetch (if exists) a gitlab group
```
gitlab-group --prefix "https://gitlab.com" --token "43hTY34c3428f47FRD890d" --delete my_new_group
```

Il will always return
```
{
   "success" : true
}
```
