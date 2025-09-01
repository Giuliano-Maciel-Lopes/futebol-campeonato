import path from "node:path";
import ConfigUpload from "../config/upload";
import fs from "node:fs";

class DiskStorageFile {
  async SaveFileTOCategory(file: string, category: string) {
    const pathTPM = path.resolve(ConfigUpload.TPM_FOLDER, file); // ou seja pegar o arquivo selecionado
    const pathCATEGORY = path.resolve(ConfigUpload.TPM_FOLDER, category); // pegar a catergoria selcioanda

    const pathFINALY = path.resolve(pathCATEGORY, file); //vai para essa pasta da categoria mais o nome o nome do arquivo
    
    await fs.promises.rename(pathTPM, pathFINALY); // vai da pasta que estava para a finaly 

    // Retorna o caminho da url para salvar no banco 
    return `TPM/${category}/${file}`; 
  }
}
export {DiskStorageFile}
