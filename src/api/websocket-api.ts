/* eslint no-console: off */
export type SendMessageModel = {
  content?: string;
  type?: string;
};

export class WebSocketApi {
  protected baseUrl: string;

  protected ws: WebSocket | null = null;

  protected interval: NodeJS.Timer | null = null;

  constructor() {
    this.baseUrl = 'wss://ya-praktikum.tech/ws/chats';
  }

  public async connect(userId: number, chatId: number, token: string) {
    this.disconect('Reconect to another chat');

    return new Promise((res) => {
      this.ws = new WebSocket(`${this.baseUrl}/${userId}/${chatId}/${token}`);

      this.ws.addEventListener('open', () => {
        res('');

        console.log('Websocket connected');

        this.interval = setInterval(() => {
          this.sendMessage({ type: 'ping' });
        }, 10000);
      });

      this.ws.addEventListener('close', (event) => {
        if (!event.wasClean) {
          console.log('Websocket aborted');
        }
      });

      this.ws.addEventListener('message', (event) => {
        try {
          const data = JSON.parse(event.data);
          this.onMessage(data);
        } catch (error) {
          console.error(error);
        }
      });

      this.ws.addEventListener('error', (event) => {
        console.error(event);
      });
    });
  }

  public disconect(reason: string = '') {
    if (this.ws) {
      this.ws.close(1000, reason);
    }

    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  public sendMessage(data: SendMessageModel = {}) {
    if (!this.ws) {
      return;
    }

    this.ws.send(JSON.stringify({ type: 'message', ...data }));
  }

  public getMessages(content: number) {
    if (!this.ws) {
      return;
    }

    this.ws.send(
      JSON.stringify({
        content: content.toString(),
        type: 'get old',
      }),
    );
  }
  /* eslint no-unused-vars: off */
  /* eslint @typescript-eslint/no-unused-vars: off */

  public onMessage(_: any) {}
}
