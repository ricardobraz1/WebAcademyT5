# Atividade 1 - Volumes no Docker

O objetivo foi criar um container MySQL em três cenários:
1. **Sem volume** (dados não persistem após remoção do container)
2. **Com Bind Mount** (pasta do host mapeada para o container)
3. **Com Volume Nomeado** (volume gerenciado pelo Docker com persistência)

Crie um container de MySQL sem volumes associados -> crie a tabela com o comando fornecido -> apague o container

Crie um container de MySQL sendo associado a um server (abstraia e considere que o servidor é uma pasta server/) ->  crie a tabela com o comando fornecido -> rode o inspect e tire print -> apague o container 

Crie um container de MySQL sendo associado a um volume (você deve criar um volume) -> crie a tabela no volume com o comando fornecido -> rode o inspect e tire print -> apague o container -> recrie o container, mapeando para o mesmo volume, e verifique se sua tabela continua lá
