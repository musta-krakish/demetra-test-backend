import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProxyService {
  async fetchData(url: string) {
    const proxyConfig = {
      host: '45.196.48.9',
      port: 5435,
      auth: {
        username: 'jtzhwqur',
        password: 'jnf0t0n2tecg',
      },
    };

    const response = await axios.get(url, { proxy: proxyConfig });
    return response.data;
  }
}
