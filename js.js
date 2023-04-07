const password = document.getElementById('password');
const check = document.getElementById('check');
const subPassword = document.getElementById('submit-password');
const subSearch = document.getElementById('submit-search');
const ul = document.getElementById('ul');
const ulReal = document.getElementById('ul-real');

// doubly linked list

class Node{
    constructor(value,next = null,prev= null){
      this.value = value
      this.next = next
      this.prev = prev
    }
  }
  
  class LinkedList{
    constructor(){
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
  
    append(value){
      let newNode = new Node(value)
      if(!this.head){
        this.head = newNode
      }else{
        this.tail.next = newNode
        newNode.prev = this.tail
      }
      this.tail = newNode
      this.length ++;
    }
  
    traverse(data){
      let currentNode = this.head
      while(currentNode !== null){
        if(currentNode.value === data) return 'Password found'
        currentNode = currentNode.next
      }
      return 'Not found'
    }

    print(){
        let currentNode = this.head
        while(currentNode !== null){
            ul.innerHTML+= `<li>${currentNode.value}</li>`
            currentNode = currentNode.next
        }
    }


  }
  
//   const print = node => console.log(node)


//   hash table 

class HashTable{
    constructor(size){
        this.buckets = new LinkedList()
        this.numBuckets = this.buckets.length
    }

    hash(key){
        let hash = 0;
        for(let i = 0;i<key.length;i++){
            const char = key.charCodeAt(i);
            hash = (hash << 5) - hash + char;
        }
        return hash
    }

    add(encrypt){
        const encrypted = this.hash(encrypt)
        this.buckets.append(encrypted)
    }

    get(userInp){
        let encrypted = this.hash(userInp)
        return this.buckets.traverse(encrypted)

    }


    display(){
        this.buckets.print()
    }

    
}

const hashTable = new HashTable()


//insert passwords to linkedlist
subPassword.addEventListener('click',()=>{
    let data = password.value
    ul.innerHTML = ''
    hashTable.add(data)
    hashTable.display()
    password.value = ''
})


// find password from linkedlist
subSearch.addEventListener('click',()=>{
    let data = check.value
    let output = hashTable.get(data)
    ulReal.innerHTML = `<li>${output}</li>`
    check.value = ''
})