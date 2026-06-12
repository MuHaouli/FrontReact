# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Configurar Backend Spring Boot

- **Pré-requisitos**: Java 17+, Maven ou Gradle, Spring Boot (starter web).
- **Porta**: garanta que o backend rode em `8080` (padrão) ou ajuste `VITE_API_BASE_URL` no `my-app/.env`.

1. Habilitar CORS (configuração global recomendada):

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowedOrigins("http://localhost:5173") // ajuste para origem do frontend (Vite)
      .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
      .allowedHeaders("*")
      .allowCredentials(true);
  }
}
```

2. Exemplo simples de controller:

```java
@RestController
@RequestMapping("/api")
public class HelloController {
  @GetMapping("/hello")
  public Map<String,String> hello() {
    return Collections.singletonMap("msg","Hello from Spring");
  }
}
```

3. `application.properties` (opcional):

```
server.port=8080
```

4. Testar localmente:

```bash
mvn spring-boot:run
# ou
./gradlew bootRun

curl http://localhost:8080/api/hello
```

5. Ajustes no frontend:

- No arquivo `my-app/.env` defina:

```
VITE_API_BASE_URL=http://localhost:8080
```

- Use a instância Axios em `my-app/src/services/api.ts` para acessar a API:

```ts
import api from './services/api';
api.get('/api/hello').then(r => console.log(r.data));
```

6. Dicas de produção:
- Use HTTPS e atualize `VITE_API_BASE_URL` para a URL pública.
- Habilite CORS apenas para origens necessárias em produção.

