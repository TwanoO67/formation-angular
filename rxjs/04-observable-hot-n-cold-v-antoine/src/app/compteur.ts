export class Compteur{
    private count = 0;
    private name = '';
    private callbacks = [];

  constructor(name) {
    console.log('Création du compteur ' + name);
    this.name = name;

    // envoi un message directement a sa création
    this.sendMessage();

    // puis toutes les x secondes
    setInterval(() => {
        this.sendMessage();
    }, 1500);
  }

  public subscribe(callback_function) {
      this.callbacks.push(callback_function);
  }

  public sendMessage() {
      this.count++;
      if ( this.callbacks ) {
        this.callbacks.forEach((callback) => {
            callback('Compteur ' + this.name + ': Message ' + this.count);
        });
      }

  }

}

