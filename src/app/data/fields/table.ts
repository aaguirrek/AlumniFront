import Certificaciones from './perfil_child/Certificaciones'
import Experiencia_Laboral from './perfil_child/experiencia_laboral'
import Habilidades from './perfil_child/Habilidades'
import Idiomas from './perfil_child/Idiomas'
import Perfil_del_exaluno_Educacion_Basica from './perfil_child/Perfil_del_exaluno_Educacion_Basica'
import Perfil_del_exalumno_Educacion_Superior from './perfil_child/Perfil_del_exalumno_Educacion_Superior'
const tables = {
	"Perfil del exaluno Educacion Basica":Perfil_del_exaluno_Educacion_Basica,
	"Experiencia laboral":Experiencia_Laboral,
	"Perfil del exalumno Educacion Superior":Perfil_del_exalumno_Educacion_Superior,
	"Habilidades":Habilidades,
	"Idiomas":Idiomas,
	"Certificaciones":Certificaciones
}
export default tables;